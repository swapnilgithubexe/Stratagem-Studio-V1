import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/v1/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/v1/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <CourseContext.Provider
      value={{ fetchCourse, fetchCourses, courses, course }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
