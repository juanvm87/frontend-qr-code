import React, { useState, useEffect } from "react";
import UserCard from "../components/common/UserCard";
import { getAllOwnerQr } from "../services/RestApi";
import Header from "../components/common/Header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress } from "@mui/material";

export default function View() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshList, setRefreshList] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOwnerQr();
      setData(response.data);
      setData((prevData) =>
        prevData.filter((card) => card._id !== refreshList)
      );

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshList]);

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  return (
    <>
      <Header letters={"QCL"} information={"QR Code List"} />
      {isLoading && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      {data.length === 0 && !isLoading && <h4>No Qr created</h4>}
      {data
        .map((card) => {
          return (
            <div key={card._id}>
              <UserCard qrData={card} refreshList={setRefreshList} />
            </div>
          );
        })
        .reverse()
        .slice((page - 1) * 8, page * 8)}
      <Stack spacing={2}>
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
          count={Math.ceil(data.length / 8)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}
