import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Button } from "@mui/material";
function Profile() {
  const [firstName, setFirstName] = useState("John");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [editingMode, setEditingMode] = useState(false);

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
          <img
            height="100px"
            width="100px"
            className="pfp"
            src=""
            alt="User pfp"
          />
          <div className="label-inp">
            <label className="lbl">Name</label>
            <input
              className="inp"
              disabled={!editingMode}
              type="text"
              value={firstName}
            />
          </div>

          <div className="label-inp">
            <label className="lbl">Email Address</label>
            <input
              className="inp"
              disabled={!editingMode}
              type="text"
              value={email}
            />
          </div>
        </div>

        <Button
          sx={{ height: "fit-content", padding: 1, marginTop: 3 }}
          variant="contained"
          size="large"
          onClick={() => setEditingMode(!editingMode)}
        >
          {editingMode ? "SAVE Profile" : "EDIT Profile"}
        </Button>
      </div>
    </div>
  );
}

export default Profile;
