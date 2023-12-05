import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextField from "./CustomTextField";
import CustomFormLabel from "./CustomFormLabel";
import { Stack } from "@mui/system";
import AuthSocialButtons from "./AuthSocialButtons";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/RestApi";

const vertical = "top";
const horizontal = "right";

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // Form Entries States

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("token");

    if (auth) {
      navigate("/home");
    }
  }, []);
  // Authentification
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check if the password meets your criteria
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    return passwordRegex.test(password);
  };

  const createAccountHandler = () => {
    if (!values.password) {
      setOpenSnackbar(true);
      setMessage("Invalid password"); // Display an error message for invalid password
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
          setMessage(err.message);
          console.log(err.message);
        });
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const handleInputChange = (event, str) => {
    setErrorMsg("");
    const { name, value } = event.target;
    /* setValues({ ...values, []: value }); */
    setValues((item) => ({ ...item, [str]: value }));
  };

  console.log(values);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h4" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}

      <Box mt={3}></Box>
      <Box>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
          <CustomTextField
            onChange={(e) => handleInputChange(e, "name")}
            id="name"
            variant="outlined"
            fullWidth
            required
          />
          <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
          <CustomTextField
            onChange={(e) => handleInputChange(e, "phone")}
            required
            id="phone"
            variant="outlined"
            fullWidth
          />
          <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
          <CustomTextField
            onChange={(e) => handleInputChange(e, "email")}
            required
            id="email"
            variant="outlined"
            fullWidth
          />
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            onChange={(e) => handleInputChange(e, "password")}
            type="password"
            required
            id="password"
            variant="outlined"
            fullWidth
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          onClick={createAccountHandler}
        >
          Sign Up
        </Button>{" "}
        <Divider sx={{ marginTop: "20px" }}>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
        <AuthSocialButtons title="Sign up with" />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={6000}
          message={message}
          key={vertical + horizontal}
        />
      </Box>
      {subtitle}
    </>
  );
};
export default AuthRegister;
