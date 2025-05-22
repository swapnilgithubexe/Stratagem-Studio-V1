import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./lecture.css";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lectureLoading, setLectureLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState(null);

  const params = useParams();

  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `${server}/api/v1/lectures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLectureLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLectureLoading(false);
      setActiveLectureId(id);
    } catch (error) {
      console.log(error);
      setLectureLoading(false);
    }
  }
  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lecture-page">
            <div className="left">
              {lectureLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        autoPlay
                      ></video>
                      <h1>{lecture.title}</h1>
                    </>
                  ) : (
                    <h1>Please select a lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="right">
              {user && user.role === "admin" && (
                <button onClick={() => setShow(!show)} className="common-btn">
                  {show ? "Close" : "Add Lecture"}
                </button>
              )}

              {show && (
                <div className="lecture-form">
                  <h2>Lecture form</h2>
                  <form action="">
                    <label htmlFor="text">Title</label>
                    <input type="text" required />

                    <label htmlFor="text">Description</label>
                    <input type="text" required />

                    <input type="file" placeholder="Choose video" required />

                    <button type="submit" className="common-btn">
                      Add
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <>
                    <div
                      onClick={() => fetchLecture(lecture._id)}
                      className={`lecture-number ${activeLectureId === lecture._id ? "active" : ""}`}
                      key={index}
                    >
                      {index + 1}. {lecture.title}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className="common-btn"
                        style={{ backgroundColor: "red" }}
                      >
                        Delete {index + 1}
                      </button>
                    )}
                  </>
                ))
              ) : (
                <p>Oops, No lecture available</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
