import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div
        style={{ cursor: "pointer" }}
        className="logo"
        onClick={() => navigate("/")}
      >
        StrataGem Studio
      </div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        {isAuth ? (
          <Link to={"/account"}>Account</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
