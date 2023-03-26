import React from 'react';

export const Register = () => {
  return (
    <div className="head">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign Up</h1>
            </div>
            <form name="" className="form">
              <div className="input-control">
                <label htmlFor="name" className="input-label" hidden>
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-field"
                  placeholder="User Name"
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
                  className="input-field"
                  placeholder="Email Address"
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
                />
              </div>
              <div className="input-control">
                <button className="input-submit">Sign Up</button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
