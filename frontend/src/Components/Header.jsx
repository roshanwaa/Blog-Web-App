import React, { useEffect, useRef, useState } from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/CSS/Header.css';
export const Header = () => {
  const lastScrollTop = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        var { pageYOffset } = window;
        if (pageYOffset > lastScrollTop.current) {
          // downward scroll
          setIsVisible(false);
        } else if (pageYOffset < lastScrollTop.current) {
          // upward scroll
          setIsVisible(true);
        } // else was horizontal scroll
        lastScrollTop.current = pageYOffset <= 0 ? 0 : pageYOffset;
      },
      { passive: true }
    );
  }, []);
  return (
    <>
      <nav className={`${isVisible ? 'visible' : ''}`}>
        <div className="header_logo">
          <Link to={'/'} className="main_logo" href="">
            <FaNewspaper className="logo" />
          </Link>
        </div>
        <div className="nav-items">
          <Link to="/login" className="nav_link" href="">
            Login
          </Link>
          <Link to="/register" className="nav_link" href="">
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};
