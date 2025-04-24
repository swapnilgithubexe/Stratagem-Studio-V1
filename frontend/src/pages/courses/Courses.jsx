import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((item) => <CourseCard course={item} key={item._id} />)
        ) : (
          <p>No courses yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
