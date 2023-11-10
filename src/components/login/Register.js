import React, { useEffect, useState } from "react";
import "./Register.css";
// import { register } from "./services/RestApi";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { signup } from "../../services/RestApi";

const vertical = "top";
const horizontal = "right";
// RegisterFunction
function Register() {
  const navigate = useNavigate();
  // iconStates
  const [formValues, setFormValues] = useState({
    formname: "",
    formphone: "",
    formemail: "",
    formpassword: "",
    formconfirmpassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // Form Entries States
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("token");

    if (auth) {
      navigate("/home");
    }
  }, []);
  // Authentification
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  // Check if the password meets your criteria
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    return passwordRegex.test(password);
  };

  const createAccountHandler = () => {
    if (values.password === values.confirmPassword && isEmail(values.email)) {
      if (!isPasswordValid(values.password)) {
        setErrorMsg("password"); // Display an error message for invalid password
      } else {
        signup({
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        })
          .then((res) => {
            if (res.status === 201) {
              localStorage.setItem("token", res.data.token);
              setOpenSnackbar(true);
              setMessage("Register Successfully!!!");
              setTimeout(() => {
                navigate("/login");
              }, 500);
            }
          })
          .catch((err) => {
            setOpenSnackbar(true);
            setMessage(err);
          });
      }
    } else if (!isEmail(values.email)) {
      console.log("email----", values.email);
      setErrorMsg("email");
    } else if (values.password !== values.confirmPassword) {
      alert("Password & Confirm Password Didn't Match");
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };
  const switchClass = (e, key) => {
    setFormValues({ ...formValues, [key]: e.target.name });
  };

  const handleInputChange = (event) => {
    setErrorMsg("");
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
        {/* Phone */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Phone"
          name="phone"
          className={
            formValues.formphone == ""
              ? "register_phone"
              : "register_phone_motion"
          }
          value={values.phone}
          onChange={handleInputChange}
          onClick={(e) => switchClass(e, "formphone")}
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
          className="fa-solid fa-envelope"
          id={
            formValues.formemail == ""
              ? "register_email_logo"
              : "register_email_logomotion"
          }
        ></i>

        {errorMsg === "email" && (
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
          className="fa-solid fa-lock"
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
          className="fa-solid fa-clone"
          id={
            formValues.formconfirmpassword == ""
              ? "register_confirmpassword_logo"
              : "register_confirmpassword_logomotion"
          }
        ></i>

        {errorMsg === "password" && (
          <div
            style={{
              color: "red",
              margin: "0px",
              padding: "0px",
              fontSize: "10px",
            }}
          >
            Password must be 8 characters or longer with at least one digit, one
            lowercase letter, one uppercase letter, and one special character.
          </div>
        )}

        <button className="account_button" onClick={createAccountHandler}>
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
