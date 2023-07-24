import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import React from 'react'

const LinkPage = () => {
const {auth, logoutUser} = useAuth()
  
  return (
    <div className='App'>
      <header>Links</header>
      <p>You are logged in</p><br/>
      <Link to="/se-only" className='Link'>Go to the software engineering page</Link><br/>
      <Link to="/tfa-only" className='Link'>Go  to the Marketers page</Link><br/>
      <Link to="/hr-only"className='Link'>Go to the human resource personnel page</Link>
      <Link to="/protected"className='Link'>Go to protected route</Link>
      {auth ? (
                <p onClick={logoutUser}>Logout</p>

            ) : (
                <Link href="/login">Login</Link>


            )}
    </div>
  )
}

export default LinkPage