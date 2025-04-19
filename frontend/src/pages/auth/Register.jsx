import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form action="">
          <label htmlFor="name">Name</label>
          <input type="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" required />

          <button className="common-btn">Register</button>
        </form>
        <p>
          Already have an account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
