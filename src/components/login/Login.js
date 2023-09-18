import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
// import all_images from "./my_imports/Imports";
// import RoutesButton from "./RoutesButton";
// import ApplicationDetails from "./utils/application.json";
// import { login } from "./services/RestApi";
import { Snackbar } from "@mui/material";

export const vertical = "top";
export const horizontal = "right";

function Login() {
  const [formValues, setFormValues] = useState({
    formemail: "",
    formpassword: "",
  });
  const [wave, setWave] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("email");
    console.log("Auth-->", auth);
    if (auth) {
      navigate("/home");
    }
  });

  const navigate = useNavigate();

  const switchClass = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const waveoriginstart = () => {
    setWave(true);
  };

  const waveoriginend = () => {
    setWave(false);
  };
  const onClickHandler = () => {
    console.log('click');
    localStorage.setItem("email",formValues.formemail);
    navigate('/Home')
  }
  // const onClickHandler = () => {
  //   if (formValues.formemail !== " " && formValues.formpassword !== " ") {
  //     login({ email: formValues.formemail, password: formValues.formpassword })
  //       .then((res) => {
  //         if (res.status === 201) {
  //           setOpenSnackbar(true);
  //           let message = "Login Successfully!!!";
  //           setMessage(message);
  //           localStorage.setItem("_id", res.data._id);
  //           localStorage.setItem("email", res.data.email);
  //           setTimeout(() => {
  //             navigate("/admin");
  //           }, 500);
  //         } else if (res.status === 200) {
  //           setOpenSnackbar(true);
  //           setMessage(res.data);
  //         }
  //       })
  //       .catch((e) => {
  //         setOpenSnackbar(true);
  //         setMessage(e);
  //       });
  //   }
  // };
  return (
    <>
      <div className="login_body">
        <div className={wave ? "circle_2" : "circle_1"}></div>
        <div
          className="circle"
          onMouseEnter={waveoriginstart}
          onMouseOut={waveoriginend}
        ></div>
        <div
          className="login_div"
          onMouseEnter={waveoriginstart}
          onMouseOut={waveoriginend}
        >
          <img
            src={`https://alphech.com/images/vision.png`}
            className="user_img"
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
          />
          <p
            className="login_heading"
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
          >
            Welcome
          </p>

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
            className={
              formValues.formemail == "" ? "login_email" : "login_email_motion"
            }
            name="formemail"
            onChange={(e) => {
              switchClass(e);
            }}
          />
          <i
            className="fa-solid fa-file-signature"
            id={
              formValues.formemail == ""
                ? "login_name_logo"
                : "login_name_logomotion"
            }
          ></i>

          {/* Password */}
          <input
            type="Password"
            placeholder="Password"
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
            className={
              formValues.formpassword == ""
                ? "login_password"
                : "login_password_motion"
            }
             name="formpassword"
             onChange={(e) => {
               switchClass(e);
             }}
          />
          <i
            class="fa-solid fa-lock"
            id={
              formValues.formpassword == ""
                ? "login_password_logo"
                : "login_password_logomotion"
            }
          ></i>
          <a className="text_decoration_off" href="/ForgotPassword">
            <p className="login_forgot_password">
              Forgot Password?
            </p>
          </a>

          <button
            className="account_login_button"
            onClick={onClickHandler}
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
          >
            Login
          </button>
          <a className="text_decoration_off" href="/Register">
            <p className="login_create_account">
              Don't have an account? Register
            </p>
          </a>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        // onClose={handleClose}
        autoHideDuration={60000}
        message={message}
        key={vertical + horizontal}
        style={{ backgroundColor: "white", color: "black" }}
      /> 
    </>
  );
}

export default Login;
