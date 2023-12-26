import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./PopUpModal.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { MyHandleContext } from "../../store/handleContext";

export function PopUpModal(props) {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(""); // State to store input value
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const { selected, setSelected } = useContext(MyHandleContext);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTextValue("");
  };

  useEffect(() => {
    const checkIfIsUpdating = () => {
      setIsUpdating(props.isUpdating);
    };
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
        <Button className="save-update-buttons" onClick={handleOpen}>
          Save
        </Button>
      )}
      {isUpdating && (
        <Button
          sx={{ marginTop: "10px" }}
          className="save-update-buttons"
          onClick={handleOpen}
        >
          Update
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-popup">
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
                  if (!isUpdating && !props.isDynamic) {
                    props.saveData(textValue);
                  } else if (props.isDynamic) {
                    props.handleUpdate(textValue);
                    setSelected("View");
                    setTimeout(() => {
                      navigate("/view");
                    }, 500);
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
