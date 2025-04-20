import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">StrataGem Studio</div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/account"}>Account</Link>
      </div>
    </header>
  );
};

export default Header;
