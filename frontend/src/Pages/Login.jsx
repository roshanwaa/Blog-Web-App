import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/loginPage.css';
import { BsFacebook, BsGoogle } from 'react-icons/bs';

export const Login = () => {
  // const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  async function userLogin(ev) {
    ev.preventDefault();

    await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ userEmail, userPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <div className="head main_container">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign In</h1>
              <p className="text text-normal">
                New user?
                <span>
                  <Link to={'/register'} className="text text-links">
                    Create an account
                  </Link>
                </span>
              </p>
            </div>
            <form name="" className="form" onSubmit={userLogin}>
              <div className="input-control">
                <label htmlFor="email" className="input-label" hidden>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  placeholder="Email Address"
                  value={userEmail}
                  onChange={(ev) => setUserEmail(ev.target.value)}
                />
              </div>
              <div className="input-control">
                <label htmlFor="password" className="input-label" hidden>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(ev) => setUserPassword(ev.target.value)}
                />
              </div>
              <div className="input-control">
                <button className="input-submit">Sign In</button>
              </div>
            </form>
            <div className="striped">
              <span className="striped-line"></span>
              <span className="striped-text">Or</span>
              <span className="striped-line"></span>
            </div>
            <div className="method">
              <div className="method-control">
                <a href="#" className="method-action">
                  <BsGoogle className="logo-google" />
                  <span>Sign in with Google</span>
                </a>
              </div>
              <div className="method-control">
                <a href="#" className="method-action">
                  <BsFacebook className="logo-facebook" />
                  <span>Sign in with Facebook</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
