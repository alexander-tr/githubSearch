import React from 'react'
import './repos.css'

function Repositorios({repos}) {
  return (
      repos.length &&
      repos.map( rep => (
        <div className='cardRepo'>
          <a href={rep.html_url} target='_blank' className='titleRepo'>{rep.name}</a>
          <p className='descRepo'>{rep.description}</p>
          <div>
          <p className='starsRepo'>Stars - {rep.stargazers_count}</p>
          <p className='issueRepo'>Issues - {rep.open_issues_count}</p>
          <p className='watchRepo'>Watchers - {rep.watchers_count}</p>
          </div>
        </div>
        ))
  )
}

export default Repositorios