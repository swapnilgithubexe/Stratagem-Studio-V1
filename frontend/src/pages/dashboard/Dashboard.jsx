import React from "react";
import "./Dashboard.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashboard = ({ user }) => {
  const { myCourse } = CourseData();

  return (
    <div className="student-dashboard">
      <h2>All enrolled courses</h2>
      <div className="dashboard-content">
        {myCourse && myCourse.length > 0 ? (
          myCourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
