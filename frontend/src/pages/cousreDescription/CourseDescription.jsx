import React, { useState, useEffect } from "react";
import "./courseDescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course, fetchCourses } = CourseData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    console.log(token);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/v1/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_LxPe47FFqxfOiz", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "StrataGem Studios", //your business name
      description: "Learn Chess",
      image:
        "https://res.cloudinary.com/dovq4sdrm/image/upload/v1745862663/logo_wcrwns.png",
      order_id: order.id,

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/v1/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              <h2>{course.description}.</h2>
              <p>Price: ₹{course.price}.</p>
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Start lecture
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
