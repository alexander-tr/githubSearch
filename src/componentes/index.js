import React,{Component} from 'react'
import { url,clienSecret,clientId } from '../utils/github'
import Repositorios from './repos'
import About from './about'
import Followers from './followers'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user : '',
      data : null,
      repos : null,
      followers : null,
      error : null,
      step : 1
    }
  }

 async  getUser(user) {
    try {
      let [response,repositories,follows] = await Promise.all([
        fetch(`${url}/${user}?client_id=${clientId}&client_secret=${clienSecret}`),
        fetch(`${url}/${user}/repos?client_id=${clientId}&client_secret=${clienSecret}`),
        fetch(`${url}/${user}/followers?client_id=${clientId}&client_secret=${clienSecret}`)
      ])
      if(response.status == 404 || repositories.status == 404 || follows.status == 404) return this.setState({
        error : 'No encontramos este usuario',
        data : null,
        repos : null
      })
    
      let data = await response.json()
      let repos = await repositories.json()
      let followers = await follows.json()
      
      this.setState({
        data,
        repos,
        followers
      })
    }
    catch(e) {
      this.setState({
        error : e.message
      })
    }
  }

  
  change = (e) => {
    this.setState({
      user : e.target.value
    })
  }

  search = () => {
    if(this.state.error) this.setState({ error : null})
    if(this.state.user.length) this.getUser(this.state.user)
  }

  setStepRepos = () => {
     this.setState({
      step : 1
    })
  }

  setStepFollowers = () => {
    if(this.state.step > 0) this.setState({
      step : 2
    })
  }


  render() {
    let dataUser = this.state.data
    let repos = this.state.repos
    let followers = this.state.followers

    return (
      <div>
        <div className="header">
          <div className="headerContainer">
            <h2>Github Search</h2>
            <div>
             <input type="text" placeholder='Busca algun usuario' value={this.state.user} onChange={this.change}/>
              <button onClick={this.search}>Buscar</button>
            </div>
          </div>
        </div>
        {
          this.state.error && 
          <p className='errorComponent'>{this.state.error}</p>
        }
        <section className='container'>        
          <div className='aboutUser'>
            {
              dataUser &&
              <About {...dataUser}/>
            }
            </div>
            {
              repos || followers ?
              <div className='aboutRepos'>
                <h3 
                  className='aboutTitleSection' 
                  onClick={this.setStepRepos}>
                Repositorios <span className='countTitleSection'>{dataUser.public_repos}</span> 
                </h3>
                <h3 
                  className='aboutTitleSection' 
                  onClick={this.setStepFollowers}>
                   Seguidores <span className='countTitleSection'>{dataUser.followers}</span> 
                </h3>
                {
                  this.state.step === 1 ?
                  Array.isArray(repos) && 
                  <Repositorios repos={repos}/>
                  :
                  <Followers followers={followers}/>
                }
              </div>
              :
              false
            }
        </section>
      </div>
    )
  }
}

export default App