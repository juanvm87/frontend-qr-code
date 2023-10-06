import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

// Authentification
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const vertical = "top";
const horizontal = "right";
// RegisterFunction
function ForgotPassword() {
  const navigate = useNavigate();
  // iconStates
  const [formValues, setFormValues] = useState({
    formemail: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // Form Entries States
  const initialValues = {
    email: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    console.log("Auth-->", auth);
    if (auth) {
      navigate("/Home");
    }
  });

  // const createAccountHandler = () => {
  //   if (values.password === values.confirmPassword && isEmail(values.email)) {
  //      register({ email: values.email, password: values.password })
  //       .then((res) => {
  //         if (res.status === 201) {
  //           setOpenSnackbar(true);
  //           setMessage("Register Successfully!!!");
  //           setTimeout(() => {
  //             navigate("/");
  //           }, 500);
  //         }
  //       })
  //       .catch((err) => {
  //         setMessage(err);
  //         setOpenSnackbar(true);
  //       });
  //   } else if (!isEmail(values.email)) {
  //     setErrorMsg(true);
  //   } else if (values.password !== values.confirmPassword) {
  //     alert("Password & Confirm Password Didn't Match");
  //   }
  // };
  const handleSendClick = () => {
    console.log("BTN CLICKED");
    setOpenSnackbar(true);
    setMessage("OTP sent to the registered mail");
  };
  const handleClose = () => {
    setOpenSnackbar(false);
  };
  const switchClass = (e, key) => {
    setFormValues({ ...formValues, [key]: e.target.name });
  };

  const handleInputChange = (event) => {
    setErrorMsg(false);
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="container-fluid master_div">
      <div className="container-fluid image_div"></div>
      <div className="container-fluid text_panel">
        <p className="heading">Forgot your password?</p>
        <p
          className="sub_heading"
          style={{ width: 400, marginLeft: 50, padding: 20 }}
        >
          Enter the registered mail and we'll help you create a new password.
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={
            formValues.formemail === ""
              ? "register_email"
              : "register_email_motion"
          }
          value={values.email}
          onChange={handleInputChange}
          onClick={(e) => switchClass(e, "formemail")}
          required
        />

        <i
          class="fa-solid fa-envelope"
          id={
            formValues.formemail === ""
              ? "register_email_logo"
              : "register_email_logomotion"
          }
        ></i>

        {/* <i
          class="fa-solid fa-clone"
          id={
            formValues.formconfirmpassword === ""
              ? "register_confirmpassword_logo"
              : "register_confirmpassword_logomotion"
          }
        ></i> */}

        {/* <button className="account_button" onClick={createAccountHandler}> */}
        <button onClick={handleSendClick} className="account_button">
          Send OTP
        </button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={2000}
          message={message}
          key={vertical + horizontal}
          // severity = "success"
        />

        <p className="existing_account">
          Back to
          <a className="text_decoration" href="/Login">
            <span className="login">login</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
