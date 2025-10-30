import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/image.jpg" alt="Ek Zaria Logo" />
          <h2>Ek Zaria Foundation</h2>
        </div>
        <div className="nav-links">
          <Link to="/recipients">Recipients</Link>
          <Link to="/add-recipient">Add Recipient</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>
    </>
  )
}

export default Nav
