import React, { useEffect, useState } from "react";
import "../../pages/Profile.css";
import { Button, Card, Snackbar, TextField } from "@mui/material";
import { getUser, userUpdate } from "../../services/RestApi";

function EditProfile(props) {
  const { refreshInfo, refresh } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");
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
        setUserNumber(user.data.userId);
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
        refreshInfo(!refresh);
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
      <div className="profile-container1">
        <Card className="profile-card">
          <div className="profile-sections">
            <div className="profile-details">
              <TextField
                className="inp"
                disabled={true}
                value={userNumber}
                label="User Number"
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                className="inp"
                disabled={!editingMode}
                label="Name"
                value={name}
                type="text"
                onChange={handleNameChange}
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                className="inp"
                disabled={!editingMode}
                label="Phone"
                value={phone}
                onChange={handlePhoneChange}
                type="tel"
                variant="outlined"
                autoComplete="off"
              />
              <TextField
                className="inp"
                disabled={!editingMode}
                label="Email Address"
                value={email}
                onChange={handleEmailChange}
                type="text"
                variant="outlined"
                autoComplete="off"
              />
            </div>

            <Button
              className="editBtn profile"
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
        </Card>
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

export default EditProfile;
