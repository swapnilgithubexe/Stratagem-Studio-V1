import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duartion}</p>
      <p>Price - ₹{course.price}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Start course
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Start course
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Login
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button className="common-btn" style={{ background: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
