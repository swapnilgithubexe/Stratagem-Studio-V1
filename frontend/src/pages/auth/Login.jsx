import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, login } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password, navigate, fetchMyCourse);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account?
          <Link to={"/register"}> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
