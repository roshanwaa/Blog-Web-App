import React, { useState } from 'react';

export const Register = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const onUserNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const onUserEmailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const onUserPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const onSingUpHandler = async (event) => {
    event.preventDefault();

    await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ userName, userEmail, userPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="head main_container">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign Up</h1>
            </div>
            <form className="form" onSubmit={onSingUpHandler}>
              <div className="input-control">
                <label htmlFor="name" className="input-label" hidden>
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userName}
                  className="input-field"
                  placeholder="User Name"
                  onChange={onUserNameChangeHandler}
                />
              </div>
              <div className="input-control">
                <label htmlFor="email" className="input-label" hidden>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userEmail}
                  className="input-field"
                  placeholder="Email Address"
                  onChange={onUserEmailChangeHandler}
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
                  value={userPassword}
                  className="input-field"
                  placeholder="Password"
                  onChange={onUserPasswordChangeHandler}
                />
              </div>
              <button className="input-submit">Sign Up</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
