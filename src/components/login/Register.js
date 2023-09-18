import React, { useEffect, useState } from "react";
import "./Register.css";
// import { register } from "./services/RestApi";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

// Authentification
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const vertical = "top";
const horizontal = "right";
// RegisterFunction
function Register() {
  const navigate = useNavigate();
  // iconStates
  const [formValues, setFormValues] = useState({
    formname: "",
    formemail: "",
    formpassword: "",
    formconfirmpassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // Form Entries States
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("email");
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
        <p className="heading">Create an account</p>
        <p className="sub_heading">Let's get started</p>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className={
            formValues.formname == "" ? "register_name" : "register_name_motion"
          }
          value={values.name}
          onChange={handleInputChange}
          onClick={(e) => switchClass(e, "formname")}
          required
        />
        <i
          className="fa-solid fa-file-signature"
          id={
            formValues.formname == ""
              ? "register_name_logo"
              : "register_name_logomotion"
          }
        ></i>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={
            formValues.formemail == ""
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
            formValues.formemail == ""
              ? "register_email_logo"
              : "register_email_logomotion"
          }
        ></i>

        {errorMsg && (
          <div
            style={{
              color: "red",
              margin: "0px",
              padding: "0px",
              fontSize: "10px",
            }}
          >
            Enter a valid email address
          </div>
        )}

        {/* Password */}
        <input
          placeholder="Password"
          name="password"
          className={
            formValues.formpassword == ""
              ? "register_password"
              : "register_password_motion"
          }
          type="password"
          value={values.password}
          onChange={handleInputChange}
          onClick={(e) => switchClass(e, "formpassword")}
          required
        />
        <i
          class="fa-solid fa-lock"
          id={
            formValues.formpassword == ""
              ? "register_password_logo"
              : "register_password_logomotion"
          }
        ></i>

        {/* Confirm Pasword */}
        <input
          placeholder="Confirm Password"
          className={
            formValues.formconfirmpassword == ""
              ? "register_confirmpassword"
              : "register_confirmpassword_motion"
          }
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          onClick={(e) => switchClass(e, "formconfirmpassword")}
          required
        />
        <i
          class="fa-solid fa-clone"
          id={
            formValues.formconfirmpassword == ""
              ? "register_confirmpassword_logo"
              : "register_confirmpassword_logomotion"
          }
        ></i>

        {/* <button className="account_button" onClick={createAccountHandler}> */}
        <button className="account_button" >
          Create account
        </button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={6000}
          message={message}
          key={vertical + horizontal}
        />

        <p className="existing_account">
          Already have an account?{" "}
          <a className="text_decoration" href="/">
            <span className="login">login</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
