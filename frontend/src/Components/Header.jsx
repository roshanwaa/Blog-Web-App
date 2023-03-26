import React from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div className="header_logo">
        <Link to={'/'} className="main_logo" href="">
          <FaNewspaper className="logo" />
        </Link>
      </div>
      <nav>
        <Link to="/login" className="" href="">
          Login
        </Link>
        <Link to="/register" className="" href="">
          Register
        </Link>
      </nav>
    </header>
  );
};
