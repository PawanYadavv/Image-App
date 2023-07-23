import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Homepage
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              {/* Home */}
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-links">
              History
            </Link>
          </li>
          {/* Add other navigation links */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
