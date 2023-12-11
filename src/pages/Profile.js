import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
  Skeleton,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import profilecover from ".././components/Images/profilebg.jpg";
import userimg from ".././components/Images/user-1.jpg";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ProfileTab from "../components/common/ProfileTab";
import BlankCard from ".././components/common/BlankCard";
import { getAllOwnerQr, getUser } from "../services/RestApi";
import EditProfile from "../components/common/EditProfile";
import Settings from "./Settings";

const Profile = () => {
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50b2fc,#f44c66)",
    borderRadius: "50%",
    width: "110px",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));
  const [isLoading, setLoading] = useState(true);
  const [totalQr, setTotalQr] = useState("");
  const [totalDynamicQr, setTotalDynamicQr] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState("profile");
  const [refresh, setRefresh] = useState(false);

  const getTotalDynamicQr = (data) => {
    return data.filter((qr) => qr.isDynamic === true);
  };
  const getUserInfo = async () => {
    try {
      const user = await getUser();

      setUser(user.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getAllUserQr = async () => {
    try {
      const qrs = await getAllOwnerQr();
      const totalDynamic = getTotalDynamicQr(qrs.data);
      setTotalQr(qrs.data.length);
      setTotalDynamicQr(totalDynamic.length);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [refresh]);

  useEffect(() => {
    getAllUserQr();
    getUserInfo();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <BlankCard>
        {isLoading ? (
          <>
            <Skeleton
              variant="square"
              animation="wave"
              width="100%"
              height={330}
            ></Skeleton>
          </>
        ) : (
          <CardMedia
            component="img"
            image={profilecover}
            alt={profilecover}
            width="100%"
            height="240px"
          />
        )}
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: "2",
                sm: "2",
                lg: "1",
              },
            }}
          >
            <Stack
              direction="row"
              textAlign="center"
              justifyContent="center"
              gap={6}
              m={3}
            >
              <Box>
                <Typography color="text.secondary">
                  <QrCodeIcon width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {totalQr}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Total Qr
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <QrCode2Icon width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {totalQr - totalDynamicQr}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Dynamic Qr
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">
                  <QrCodeScannerIcon width="20" />
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {totalDynamicQr}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Static Qr
                </Typography>
              </Box>
            </Stack>
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: "1",
                sm: "1",
                lg: "2",
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: "-85px",
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userimg}
                    alt={userimg}
                    sx={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      border: "4px solid #fff",
                    }}
                  />
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    {user.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {user.phone}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: "3",
                sm: "3",
                lg: "3",
              },
            }}
          ></Grid>
        </Grid>
        {/**TabbingPart**/}
        <ProfileTab edit={setEdit} />
        {edit == "profile" && (
          <EditProfile
            edit={setEdit}
            refreshInfo={setRefresh}
            refresh={refresh}
          />
        )}
        {edit == "password" && <Settings profileInfo={user} edit={setEdit} />}
      </BlankCard>
    </>
  );
};
export default Profile;
