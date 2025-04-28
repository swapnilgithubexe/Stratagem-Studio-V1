import React, { useEffect } from "react";
import "./courseDescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={`${server}/${course.image}`}
              className="course-image"
              alt=""
            />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>Instructor: {course.createdBy}</p>
              <p>Duration: {course.duration} Weeks</p>
            </div>
          </div>
          <p>Price: ₹{course.price}.</p>
          {user && user.subscription.includes(course._id) ? (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Start lecture
            </button>
          ) : (
            <button className="common-btn">Buy now</button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;
