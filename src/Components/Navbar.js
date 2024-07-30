import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Get username from localStorage
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : null;

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/user/logout', {
        method: 'POST',
      
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
  
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Optionally redirect to login page
      navigate('/'); 
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <nav className="navbar">
      <h3 className='navbar-header'>Daily Task Report Web Portal</h3>
      <ul className="navbar-links">
        {username ? (
          <>
            <li className="navbar-item">Welcome, {username}</li>
            <li>
              <button onClick={handleLogout} className="navbar-link">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-link">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
