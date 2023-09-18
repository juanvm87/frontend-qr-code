import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Home from '../Home';
import Create from '../Create';
import View from '../View';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Icon, ListItemIcon } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Settings from './Settings';
import { AccountCircleOutlined, GroupsOutlined, Person } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccessControl from './AccessControl';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [menuData, setMenuData] = useState("Home")
    const navigate = useNavigate();
    const homePage = ["/Home", "/Create", "/View"];
    const isHomePage = homePage.some(val => window.location.toString().includes(val))
    // const profilePage

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const [selected, setSelected] = useState(menuData)

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleMenuClick = (e) => {
        navigate("/" + e);
        setSelected(e)
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/Login");
        // alert("Redireted to Login")
    }
    const handleSettings = () => {
        navigate("/Settings")
        setSelected("Settings")
        // alert("Redirected to Settings")
    }
    const handleProfile = () => {
        navigate('/Profile')
        setSelected("Profile")
        // alert("Redirected to Profile")
    }
    return (
        <>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ backgroundColor: "#ffffff" }} >
                    <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}  >

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                            <IconButton
                                color="#32c0c3"
                                aria-label="open drawer"
                                onClick={() => { setOpen(!open) }}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" fontWeight='bold' noWrap component="div" style={{ color: "#32c0c3" }} >
                                QR PLATFORM
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem', color: "#777777", cursor: 'pointer' }}  >
                            {/* <Typography onClick={handleHome} >H </Typography> */}
                            <Typography onClick={handleProfile} > <Person/> </Typography>
                            <Typography onClick={handleSettings} > <SettingsIcon />  </Typography>
                            <Typography onClick={handleLogout} > <LogoutIcon />  </Typography>

                        </div>

                    </Toolbar>

                </AppBar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}

                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader style={{ backgroundColor: "#f1f5ff", color: "#777777" }} >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />


                    <List style={{ backgroundColor: "#f1f5ff", color: "#777777", height: '100%' }}>
                        <ListItem disablePadding style={{ backgroundColor: selected === "Home" ? "#5BC0DE" : "#f1f5ff", color: selected === "Home" ? "white" : "#777777" }} >
                            <ListItemButton onClick={() => { handleMenuClick("Home") }} >
                                <ListItemIcon> <HomeOutlinedIcon style={{ color: selected === "Home" ? "white" : "#777777" }} />  </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <Divider />
                        </ListItem>
                        {
                            isHomePage &&
                            <>
                                <ListItem disablePadding style={{ backgroundColor: selected === "Create" ? "#5BC0DE" : "#f1f5ff", color: selected === "Create" ? "white" : "#777777" }} >
                                    <ListItemButton onClick={() => handleMenuClick("Create")}>
                                        <ListItemIcon><AddCircleOutlineOutlinedIcon style={{ color: selected === "Create" ? "white" : "#777777" }} /></ListItemIcon>
                                        <ListItemText primary="Create" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>



                                <ListItem disablePadding style={{ backgroundColor: selected === "View" ? "#5BC0DE" : "#f1f5ff", color: selected === "View" ? "white" : "#777777" }} >
                                    <ListItemButton onClick={() => handleMenuClick("View")}>
                                        <ListItemIcon> <QrCode2OutlinedIcon style={{ color: selected === "View" ? "white" : "#777777" }} />  </ListItemIcon>
                                        <ListItemText primary="View" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>
                            </>
                        }

                        {
                            !isHomePage &&
                            <>
                                <ListItem disablePadding style={{ backgroundColor: selected === "Profile" ? "#5BC0DE" : "#f1f5ff", color: selected === "Profile" ? "white" : "#777777" }} >
                                    <ListItemButton onClick={() => handleMenuClick("Profile")}>
                                        <ListItemIcon><AccountCircleOutlined style={{ color: selected === "Profile" ? "white" : "#777777" }} /></ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>

                                <ListItem disablePadding style={{ backgroundColor: selected === "Settings" ? "#5BC0DE" : "#f1f5ff", color: selected === "Settings" ? "white" : "#777777" }} >
                                    <ListItemButton onClick={() => handleMenuClick("Settings")}>
                                        <ListItemIcon> <SettingsOutlinedIcon style={{ color: selected === "Settings" ? "white" : "#777777" }} />  </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>
                                <ListItem disablePadding style={{ backgroundColor: selected === "AccessControl" ? "#5BC0DE" : "#f1f5ff", color: selected === "AccessControl" ? "white" : "#777777" }} >
                                    <ListItemButton onClick={() => handleMenuClick("AccessControl")}>
                                        <ListItemIcon> <GroupsOutlined style={{ color: selected === "AccessControl" ? "white" : "#777777" }} />  </ListItemIcon>
                                        <ListItemText primary="Access Control" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>
                            </>
                        }

                    </List>

                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {window.location.toString().includes("/Home") && <Home />}
                    {window.location.toString().includes("/Create") && <Create />}
                    {window.location.toString().includes("/View") && <View />}
                    {window.location.toString().includes("/Profile") && <Profile />}
                    {window.location.toString().includes("/Settings") && <Settings />}
                    {window.location.toString().includes("/AccessControl") && <AccessControl />}
                </Main>

            </Box >
        </>
    );
}
