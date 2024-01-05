import { Box, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TableForm = (props) => {
  const { qrInfo } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [qrForms, setQrForms] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log("dddddddddd", qrInfo);
  }, [qrInfo.formResponses]);
  const handleClose = () => {
    setOpen(false);
  };
  // Map qrForms to rows and columns for DataGrid
  const rows = qrInfo.formResponses.map((item, index) => ({
    id: index,
    ...item,
  }));

  const columns = qrInfo.input.map((item) => {
    if (item.type === "signature") {
      return {
        field: item.name,
        headerName: item.name,
        flex: 1,
        editable: true,
        renderCell: ({ row }) =>
          row.Signature ? (
            <>
              <img src={row.Signature} alt="" width={50} height={50} />
            </>
          ) : (
            <p>NA</p>
          ),
      };
    } else if (item.type === "richText") {
      return {
        field: item.name,
        headerName: item.name,
        flex: 1,
        editable: true,
        renderCell: ({ row }) =>
          row[item.name] ? (
            <>{row[item.name].replace(/(<([^>]+)>)/gi, "")}</>
          ) : (
            <p>NA</p>
          ),
      };
    } else {
      return {
        field: item.name,
        headerName: item.name,
        flex: 1,
        editable: true,
      };
    }
  });
  return (
    <>
      {qrInfo.formResponses.length > 0 && (
        <Box sx={{ m: 2 }}>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1000} // Adjust the duration as needed
            message={snackbarMessage}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          />
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={40}>Form Replies</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={rows.length === 0}
              hideScrollbar={false}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 50, 100]}
            />
          </Box>

          <React.Fragment>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Warning</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete {open.name}?
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        </Box>
      )}
      {qrInfo.formResponses.length <= 0 && (
        <p>No response to the form has been received.</p>
      )}
    </>
  );
};
export default TableForm;
