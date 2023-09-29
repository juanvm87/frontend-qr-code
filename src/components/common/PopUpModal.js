import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState(""); // State to store input value
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTextValue("");
  };

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    setTextValue(newValue);
  };

  console.log("New Title Value:", textValue);

  return (
    <>
      <Button sx={{ width: "100%" }} onClick={handleOpen}>
        Save
      </Button>
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
                  props.saveData(textValue);
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
