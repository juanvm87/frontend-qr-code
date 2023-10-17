import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Button, Snackbar } from "@mui/material";
import { getUser, userUpdate } from "../../services/RestApi";

function Profile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [horizontal] = useState("right");
  const [vertical] = useState("top");

  const closePopUp = (time) => {
    setTimeout(() => {
      setOpenSnackbar(false);
    }, time);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUser();
      if (user.status === 200) {
        setPhone(user.data.phone);
        setName(user.data.name);
        setEmail(user.data.email);
      }
    };
    fetchUserInfo();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSave = async () => {
    try {
      const update = {
        name,
        phone,
        email,
      };
      const response = await userUpdate(update);
      if (response.status === 200) {
        setMessage("Profile saved successfully.");
        setOpenSnackbar(true);
        closePopUp(6000);
      } else {
        setMessage("Error saving profile. Please try again.");
        setOpenSnackbar(true);
        closePopUp(6000);
      }
    } catch (error) {
      setMessage("Error saving profile. Please try again.");
      setOpenSnackbar(true);
      closePopUp(6000);
      console.log(error);
    }
  };

  return (
    // Navbar
    <div className="Profile_bodies">
      <div className="profile-heading">
        <div className="box">UP</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            className="floating-heading"
            style={{ color: "#ffffff", fontWeight: 400 }}
          >
            User Profile
          </h1>
          <div className="line"></div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-details">
          <div className="label-inp">
            <label className="lbl">Name</label>
            <input
              className="inp"
              disabled={!editingMode}
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="label-inp">
            <label className="lbl">Phone</label>
            <input
              className="inp"
              disabled={!editingMode}
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="label-inp">
            <label className="lbl">Email Address</label>
            <input
              className="inp"
              disabled={!editingMode}
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <Button
          sx={{
            height: "fit-content",
            padding: 1,
            marginTop: 3,
            backgroundColor: "rgb(91, 192, 222)",
          }}
          variant="contained"
          size="large"
          onClick={() => {
            setEditingMode(!editingMode);
            if (editingMode) {
              handleSave();
            }
          }}
        >
          {editingMode ? "SAVE Profile" : "EDIT Profile"}
        </Button>
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
    </div>
  );
}

export default Profile;
