import React, { useState } from "react";
import icon1 from "../Images/google-icon.svg";
import icon2 from "../Images/facebook-icon.svg";
import CustomSocialButton from "./CustomSocialButton";
import { Stack } from "@mui/system";
import { Alert, Avatar, Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import decodeJwt from "../helperFunction/decodeJwt";
import { googleSignin } from "../../services/RestApi";
import { useNavigate } from "react-router-dom";

const AuthSocialButtons = ({ title }) => {
  const navigate = useNavigate();

  const handleFailue = (result) => {
    console.log("falue---", result);
  };
  const handleLogin = async (googleData) => {
    try {
      console.log(googleData);
      if (googleData.credential) {
        console.log("ddddddddddd");
        const response = await googleSignin({ data: googleData.credential });
        console.log("response", response);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
    } catch (error) {}
  };
  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <GoogleLogin useOneTap onSuccess={handleLogin} onError={handleFailue} />
      </Stack>
    </>
  );
};
export default AuthSocialButtons;
