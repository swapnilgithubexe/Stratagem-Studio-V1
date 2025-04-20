import React from "react";
import "./footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { FaXTwitter, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2025 E-Learning Platform. All rights reserved. <br /> Made with
          🎶 <a href="">Swapnil Dutta</a>
        </p>
        <div className="social-links">
          <a href="">
            <FaFacebookF />
          </a>
          <a href="">
            <FaXTwitter />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
