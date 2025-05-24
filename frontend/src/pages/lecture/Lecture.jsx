import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./lecture.css";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lectureLoading, setLectureLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", desc);
    myForm.append("file", video);
    try {
      const data = await axios.post(
        `${server}/api/v1/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message || "Lecture added!");
      setBtnLoading(false);
      setShow(false);
      fetchLectures();

      setTitle("");
      setDesc("");
      setVideo("");
      setVideoPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);

      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you wanna delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/v1/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

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
                  <form action="" onSubmit={submitHandler}>
                    <label htmlFor="text">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <label htmlFor="text">Description</label>
                    <input
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      type="text"
                      required
                    />
                    <label htmlFor="text">Lecture</label>
                    <input
                      type="file"
                      placeholder="Choose video"
                      required
                      onChange={changeVideoHandler}
                    />

                    {videoPreview && (
                      <video
                        src={videoPreview}
                        alt=""
                        width={250}
                        controls
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="common-btn"
                    >
                      {btnLoading ? "Please wait..." : "Add"}
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
                        onClick={() => deleteHandler(lecture._id)}
                        className="common-btn"
                        style={{ backgroundColor: "red" }}
                      >
                        Delete lecture {index + 1}
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
