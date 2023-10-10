import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function PopUpModal(props) {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(""); // State to store input value
  const handleOpen = () => setOpen(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setTextValue("");
  };

  useEffect(() => {
    const checkIfIsUpdating = () => {
      setIsUpdating(props.isUpdating);
    };
    console.log("updating", isUpdating);
    checkIfIsUpdating();
  }, []);
  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    setTextValue(newValue);
  };

  return (
    <>
      {!isUpdating && (
        <Button sx={{ width: "100%" }} onClick={handleOpen}>
          Save
        </Button>
      )}
      {isUpdating && (
        <Button onClick={handleOpen} sx={{ width: "100%" }}>
          Update
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Title
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Text"
              onChange={handleInputChange}
              inputProps={{ maxLength: 25 }}
            />
            <Box>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  if (!isUpdating) {
                    props.saveData(textValue);
                  } else {
                    props.handleUpdate(textValue);
                  }

                  props.setDownloadType(null);
                  handleClose();
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
