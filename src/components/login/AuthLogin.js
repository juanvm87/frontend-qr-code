import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomCheckbox from "./CustomCheckBox";
import CustomTextField from "./CustomTextField";
import CustomFormLabel from "./CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { signin } from "../../services/RestApi";
export const vertical = "top";
export const horizontal = "right";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [formValues, setFormValues] = useState({
    formemail: "",
    formpassword: "",
  });
  const [wave, setWave] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/home");
    }
  }, []);

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
    if (formValues.formemail !== " " && formValues.formpassword !== " ") {
      signin({ email: formValues.formemail, password: formValues.formpassword })
        .then((res) => {
          if (res.status === 201) {
            setOpenSnackbar(true);
            let message = "Login Successfully!!!";
            setMessage(message);
            localStorage.setItem("token", res.data.token);
            setTimeout(() => {
              navigate("/home");
            }, 500);
          } else if (res.status === 200) {
            setOpenSnackbar(true);
            setMessage(res.data);
          }
        })
        .catch((e) => {
          setOpenSnackbar(true);

          setMessage(e.response.data.message);
          setTimeout(() => {
            setOpenSnackbar(false);
          }, 6000);
        });
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="600" variant="h4" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}

      <Box mt={3}></Box>
      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
            id="username"
            variant="outlined"
            name="formemail"
            onChange={(e) => {
              switchClass(e);
            }}
            fullWidth
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            onMouseEnter={waveoriginstart}
            onMouseOut={waveoriginend}
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            name="formpassword"
            onChange={(e) => {
              switchClass(e);
            }}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          onClick={onClickHandler}
          onMouseEnter={waveoriginstart}
          onMouseOut={waveoriginend}
          type="button"
        >
          Sign In
        </Button>
        <Divider sx={{ marginTop: "20px" }}>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
        <AuthSocialButtons title="Sign in with" />
      </Box>
      {subtitle}
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
};
export default AuthLogin;
