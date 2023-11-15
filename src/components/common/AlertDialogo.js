import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DotsMenu from "./DotsMenu";
import { deleteQr } from "../../services/RestApi";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { handleNavigation, qrId } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const reply = await deleteQr(qrId);
      console.log("status--->>", reply.status);

      if (reply.status === 200) {
        console.log("reply--->>", reply);
      }
    } catch (error) {
      console.error("An error occurred during QR code deletion:", error);
    }
  };

  return (
    <React.Fragment>
      <DotsMenu
        handleModelOpen={handleClickOpen}
        handleNavigation={handleNavigation}
        qrId={qrId}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Qr</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the QR code with the ID{" "}
            <strong>{qrId}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
