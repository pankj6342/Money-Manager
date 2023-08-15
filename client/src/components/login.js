import React from 'react';
import '../styles/signup.css';
import Header from './Header';
export const Login = (props) => {
  return (
    <div>
      <Header />
      <div className="container signup">

        <div className="signup-logo">
          <img height="250px" src={require("../images/logo.png")} alt="" />
        </div>


        <div className="signup-form">
          <form onSubmit={props.login}>
            <h3>WELCOME TO MONEY-MANAGER</h3>
            {/* <label htmlFor="">Email address</label> */}
            <input placeholder='Your Email Address' required id="email" onChange={props.input} className="form-control" type="text" />

            {/* <label htmlFor="">Password</label> */}
            <input placeholder='Password' required type="password" id="password" onChange={props.input} className="form-control"/>

            {props.sts && <p style={{ color: "red" }}><i class="fas fa-exclamation-circle"></i> Invalid Username or Password</p>}
            <input type="submit" className="btn" value="Log In"/>
          </form>
        </div>
      </div>
    </div>
  )
} 