import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Stack } from "@mui/material";
import PageContainer from "./PageContainer";
import img1 from "../Images/login-bg.svg";
import img2 from "../Images/alphech1.png";
import AuthRegister from "./AuthRegister";
const Register = () => (
  <>
    <PageContainer title="Register" description="this is Register page">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ overflowX: "hidden" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
              />
              <img
                src={img2}
                alt="alphech"
                style={{
                  width: "150px",
                  maxWidth: "180px",
                  position: "absolute",
                  top: 0,
                  left: -10,
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <AuthRegister
              title="Welcome to QR SKAN"
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Already have an Account?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
    <div style={{ margin: "5px" }}>
      <footer>&copy; Copyright 2023 Alphech Global Private Limited</footer>
    </div>
  </>
);
export default Register;
