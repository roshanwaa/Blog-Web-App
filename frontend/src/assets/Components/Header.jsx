import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TfiWrite } from 'react-icons/tfi';
import { RiUser6Line, RiUserAddLine } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';

import '../CSS/Header.css';
import { UserContext } from '../../Pages/UserContext';

export const Header = () => {
  const lastScrollTop = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  // const [userName, setUserName] = useState(null);

  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((usrInfo) => setUserInfo(usrInfo));
  }, []);

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

  const signOutHandler = (ev) => {
    ev.preventDefault();
    fetch('http://localhost:4000/signOut', {
      method: 'POST',
      credentials: 'include',
    });
    setUserInfo(null);
  };

  // const userName = userInfo?.userName;
  const userName = userInfo;

  return (
    <>
      <nav className={`${isVisible ? 'visible' : ''}`}>
        <div className="header_logo">
          <Link to={'/'} className="main_logo" href="">
            <FaNewspaper className="logo" />
          </Link>
        </div>
        <div className="nav-items">
          {userName && (
            <>
              <Link to={'/create'}>
                <TfiWrite />
                Write
              </Link>
              <a onClick={signOutHandler}>
                <FaSignOutAlt /> Sign out
              </a>
            </>
          )}
          {!userName && (
            <>
              <Link to="/login" className="nav_link" href="">
                <RiUser6Line />
                Login
              </Link>
              <Link to="/register" className="nav_link" href="">
                <RiUserAddLine />
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
