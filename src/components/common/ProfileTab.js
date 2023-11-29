import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { Link, useLocation } from "react-router-dom";
const ProfileTab = (props) => {
  const { edit } = props;
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ProfileTabs = [
    {
      label: "Edit Profile",
      icon: <PersonIcon size="20" />,

      value: "profile",
    },
    {
      label: "Change Password",
      icon: <PasswordIcon size="20" />,

      value: "password",
    },
  ];
  useEffect(() => {
    setValue("profile");
  }, []);
  return (
    <Box
      mt={1}
      sx={{
        mt: 1,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Box
        justifyContent="flex-start"
        display="flex"
        sx={{ overflow: "auto", width: { xs: "333px", sm: "auto" } }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable prevent tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                onClick={() => {
                  edit(tab.value);
                }}
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: "50px" }}
                icon={tab.icon}
                component={Link}
                value={tab.value}
                key={tab.label}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};
export default ProfileTab;
