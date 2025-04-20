import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to StrataGem Studio</h1>
          <p>Learn, Play, and Excel.</p>
          <button className="common-btn" onClick={() => navigate("/courses")}>
            Get started
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
