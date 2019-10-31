import React from 'react'
import './about.css'

function Acerca({avatar_url,name,login,bio,company,location,blog,followers}) {
  return (
    <div>
      <img className='avatarUser' src={avatar_url} alt=""/>
      <h3 className='nameUser'>{name}</h3>
      <p className='aliasUser'>{login}</p>
      <p className='infoUser'>{bio}</p>
      <p className='infoUser'>{company}</p>
      <p className='infoUser'>{location}</p>
      <p className='infoUser'>{blog}</p>
      <p className='infoUser'>Followers : {followers}</p>
    </div>
  )
}

export default Acerca