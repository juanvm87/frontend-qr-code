import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AccountCircleOutlined, GetApp, Person } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { MyHandleContext } from "../../store/handleContext";
import { googleLogout } from "@react-oauth/google";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { selected, setSelected } = useContext(MyHandleContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  //const [selected, setSelected] = useState(menuData);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuClick = (e) => {
    navigate("/" + e);
    setSelected(e);
    handleDrawerClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: "rgb(91, 192, 222)" }}>
          <Toolbar
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                color="#32c0c3"
                aria-label="open drawer"
                onClick={() => {
                  setOpen(!open);
                }}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight="bold"
                noWrap
                component="div"
                style={{ color: "white" }}
              >
                QR PLATFORM
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1.5rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              {/* <Typography onClick={handleHome} >H </Typography> */}
              <Typography onClick={() => handleMenuClick("profile")}>
                <Person />
              </Typography>
              <Typography onClick={handleLogout}>
                <LogoutIcon />
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          className="mydrawer"
          style={{ position: "absolute" }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader
            style={{ backgroundColor: "#f1f5ff", color: "#777777" }}
          >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List
            style={{
              backgroundColor: "#f1f5ff",
              color: "#777777",
              height: "100%",
            }}
          >
            <ListItem
              disablePadding
              style={{
                backgroundColor: selected === "home" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "home" ? "white" : "#777777",
              }}
            >
              <ListItemButton
                onClick={() => {
                  handleMenuClick("home");
                }}
              >
                <ListItemIcon>
                  {" "}
                  <HomeOutlinedIcon
                    style={{ color: selected === "home" ? "white" : "#777777" }}
                  />{" "}
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              <Divider />
            </ListItem>

            <ListItem
              disablePadding
              style={{
                backgroundColor: selected === "create" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "create" ? "white" : "#777777",
              }}
            >
              <ListItemButton onClick={() => handleMenuClick("create")}>
                <ListItemIcon>
                  <AddCircleOutlineOutlinedIcon
                    style={{
                      color: selected === "create" ? "white" : "#777777",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItemButton>
              <Divider />
            </ListItem>

            <ListItem
              disablePadding
              style={{
                backgroundColor: selected === "view" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "view" ? "white" : "#777777",
              }}
            >
              <ListItemButton onClick={() => handleMenuClick("view")}>
                <ListItemIcon>
                  {" "}
                  <QrCode2OutlinedIcon
                    style={{
                      color: selected === "view" ? "white" : "#777777",
                    }}
                  />{" "}
                </ListItemIcon>
                <ListItemText primary="View" />
              </ListItemButton>
              <Divider />
            </ListItem>

            <ListItem
              disablePadding
              style={{
                backgroundColor: selected === "qr-info" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "qr-info" ? "white" : "#777777",
              }}
            >
              <ListItemButton onClick={() => handleMenuClick("qr-info")}>
                <ListItemIcon>
                  {" "}
                  <GetApp
                    style={{
                      color: selected === "qr-info" ? "white" : "#777777",
                    }}
                  />{" "}
                </ListItemIcon>
                <ListItemText primary="Access to QR" />
              </ListItemButton>
              <Divider />
            </ListItem>
            <ListItem
              disablePadding
              style={{
                backgroundColor:
                  selected === "create-dynamic" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "create-dynamic" ? "white" : "#777777",
              }}
            >
              <ListItemButton onClick={() => handleMenuClick("create-dynamic")}>
                <ListItemIcon>
                  <AddCircleOutlineOutlinedIcon
                    style={{
                      color:
                        selected === "create-dynamic" ? "white" : "#777777",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Dynamic QR" />
              </ListItemButton>
              <Divider />
            </ListItem>
            <ListItem
              disablePadding
              style={{
                backgroundColor:
                  selected === "custom-qr" ? "#5BC0DE" : "#f1f5ff",
                color: selected === "custom-qr" ? "white" : "#777777",
              }}
            >
              <ListItemButton onClick={() => handleMenuClick("custom-qr")}>
                <ListItemIcon>
                  <AddCircleOutlineOutlinedIcon
                    style={{
                      color: selected === "custom-qr" ? "white" : "#777777",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Custom QR" />
              </ListItemButton>
              <Divider />
            </ListItem>

            <>
              <ListItem
                disablePadding
                style={{
                  backgroundColor:
                    selected === "profile" ? "#5BC0DE" : "#f1f5ff",
                  color: selected === "profile" ? "white" : "#777777",
                }}
              >
                <ListItemButton onClick={() => handleMenuClick("profile")}>
                  <ListItemIcon>
                    <AccountCircleOutlined
                      style={{
                        color: selected === "profile" ? "white" : "#777777",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <Divider />
              </ListItem>

              {/*  <ListItem
                disablePadding
                style={{
                  backgroundColor:
                    selected === "AccessControl" ? "#5BC0DE" : "#f1f5ff",
                  color: selected === "AccessControl" ? "white" : "#777777",
                }}
              >
                <ListItemButton
                  onClick={() => handleMenuClick("AccessControl")}
                >
                  <ListItemIcon>
                    {" "}
                    <GroupsOutlined
                      style={{
                        color:
                          selected === "AccessControl" ? "white" : "#777777",
                      }}
                    />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Access Control" />
                </ListItemButton>
                <Divider />
              </ListItem> */}
            </>
          </List>
        </Drawer>
        <Main open={open} sx={{ width: "100%", margin: 0 }}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
