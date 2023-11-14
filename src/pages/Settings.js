import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, Snackbar } from "@mui/material";
import { userUpdate } from "../services/RestApi";
import Header from "../components/common/Header";

function Settings() {
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [horizontal] = useState("right");
  const [vertical] = useState("top");

  const closePopUp = (time) => {
    setTimeout(() => {
      setOpenSnackbar(false);
    }, time);
  };

  const handleOldPassChange = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    setNewPass(e.target.value);
  };

  const handleNewPass2Change = (e) => {
    setNewPass2(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const saveSettings = async () => {
    try {
      if (oldPass && newPass) {
        const updatePassword = {
          password: oldPass,
          newPassword: newPass,
        };
        if (newPass !== newPass2) {
          setMessage("New Password and Confirm Password do not match.");
          setOpenSnackbar(true);
          closePopUp(6000);
        } else {
          const updated = await userUpdate(updatePassword);
          if (updated.status === 200) {
            setMessage("Settings saved successfully.");
            setOpenSnackbar(true);
            closePopUp(6000);
          }
        }
      } else {
        setMessage("Please fill in all required fields.");
        setOpenSnackbar(true);
        closePopUp(6000);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setOpenSnackbar(true);
      closePopUp(6000);

      console.log(error);
    }
  };
  const cancelSettings = () => {
    setNewPass2("");
    setOldPass("");
    setNewPass("");
  };

  return (
    <>
      <div className="Settings_bodies">
        <Header letters={"S"} information={"Settings"} />

        <div className="profile-sections">
          <div className="profile-details">
            <div className="label-inp">
              <label className="lbl">Old Password</label>
              <input
                className="inp"
                type={showPassword ? "text" : "password"}
                value={oldPass}
                onChange={handleOldPassChange}
              />
            </div>
            <div className="label-inp">
              <label className="lbl">New Password</label>
              <input
                className="inp"
                type={showPassword ? "text" : "password"}
                value={newPass}
                onChange={handleNewPassChange}
              />
            </div>

            <div className="label-inp">
              <label className="lbl">Confirm New Password</label>
              <input
                className="inp"
                type={showPassword ? "text" : "password"}
                value={newPass2}
                onChange={handleNewPass2Change}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={toggleShowPassword}
                  name="showPassword"
                  color="primary"
                />
              }
              label="Show Password"
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button
                sx={{ height: "fit-content", padding: 1, marginTop: 3 }}
                variant="contained"
                size="large"
                onClick={saveSettings}
              >
                SAVE
              </Button>
              <Button
                sx={{ height: "fit-content", padding: 1, marginTop: 3 }}
                variant="contained"
                color="error"
                size="large"
                onClick={cancelSettings}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        sx={{ marginTop: "40px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        message={message}
        key={vertical + horizontal}
        style={{ backgroundColor: "white", color: "black" }}
      />
    </>
  );
}

export default Settings;
