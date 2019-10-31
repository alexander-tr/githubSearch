import React from 'react'
import './followers.css'

function Seguidores ({followers}) {
  return <div className="followerContainer">
    {
    followers.map( follow => (
      <div className="followerCard">
        <img src={follow.avatar_url} alt=""/>
        <a className='followerName' href={follow.html_url}>{follow.login}</a>
      </div>
     ))
    }
  </div>
  
}

export default Seguidores