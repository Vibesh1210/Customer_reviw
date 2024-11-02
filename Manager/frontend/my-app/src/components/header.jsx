import { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import {UserContext,UserContextProvider} from './usercontext';
function Header() {
    const { setuser, user } = useContext(UserContext);
  
    useEffect(() => {
      fetch('http://localhost:4000/user', {
        credentials: 'include',
      }).then((response) => {
        response.json().then((user) => {
          setuser(user);
        });
      });
    }, [setuser]);
  
    async function logout() {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setuser(null);
    }
  
    const username = user?.username;
  
    return (
      <header className="header">
        <div className="container">
          <Link to={username ? '/' : '/register'} className="logo">
            <img src='https://cdni.iconscout.com/illustration/premium/thumb/account-manager-illustration-download-in-svg-png-gif-file-formats--accountant-finance-digital-media-pack-business-illustrations-7558315.png' className='logo'/>
            
          </Link>
          
          <nav className="nav">
            {username ? (
              <>
                <Link to="/add" className="nav-link">
                  Add Customer
                </Link>
                
                <Link to={'/register'}>
                <button  className="nav-link logout-button" onClick={logout}>
                  Logout
                </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    );
  }

export default Header;
