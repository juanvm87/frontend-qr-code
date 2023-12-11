import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./FormBuilderSidebar.css";

import { v4 } from "uuid";
import {
  ClearOutlined,
  DeleteOutlined,
  OpenWith,
  SettingsOutlined,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import "./MiddleForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SignaturePad from "react-signature-canvas";

import { JSONEditor } from "react-json-editor-viewer";

const MiddleForm = ({
  formSubmitted,
  closeSuccessModal,
  formElementsList,
  setFormElementsList,
  selectedElement,
  checked,
  setSelectedElement,
  setDrawerType2,
  handleOnClickDelete,
  setDrawerType,
  previewSubmit,
  isViewing,
}) => {
  const isInEditMode = useLocation().pathname.split("/")[2] === "edit";
  const handleInputChange = (event, item) => {
    const { value } = event.target;
    console.log(value);
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = value;
        }
        return val;
      }),
    ]);
  };
  const sigPadRef = useRef();
  const handleClear = () => {
    sigPadRef.current.clear();
  };

  const handleTrim = (item) => {
    const trimmedData = sigPadRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = trimmedData;
        }
        return val;
      }),
    ]);
  };

  const handleModalClose = () => {
    closeSuccessModal();
  };

  const handleDateChange = (dateString, item) => {
    const dateObj = new Date(dateString);
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = dateObj;
        }
        return val;
      }),
    ]);
  };

  const handleContentChange = (content, item) => {
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = content;
        }
        return val;
      }),
    ]);
  };
  const onJsonChange = (key, value, parent, data) => {
    console.log(key, value, parent, data);
  };

  const handleTimeChange = (e, item) => {
    console.log("timeItem", item);
    const { value } = e.target;
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = value;
        }
        return val;
      }),
    ]);
  };

  const handleOnLabelChange = (event, item) => {
    const { value } = event.target;
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.label = value;
        }
        return val;
      }),
    ]);
  };

  const handleMultipleInputChange = (event, item, subfield) => {
    const { value } = event.target;
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          if (val.value) {
            val.value = { ...val.value, [subfield]: value };
          } else {
            val.value = { [subfield]: value };
          }
        }
        return val;
      }),
    ]);
  };

  const toggleEditOptionsForDropDown = (item) => {
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.isAddingOptionsForDropDown = !val.isAddingOptionsForDropDown;
        }
        return val;
      }),
    ]);
  };

  const getOptionValues = (item) => {
    return item.optionsArray.join("\n");
  };

  const handleAddDropdownOptions = (event, item) => {
    const { value } = event.target;
    const optionsArray = value.split("\n");
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.optionsArray = optionsArray;
        }
        return val;
      }),
    ]);
  };

  const handleDeleteSingleChoiceOptions = (item, key) => {
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.optionsArray = val.optionsArray.filter((t) => t.key != key);
        }
        return val;
      }),
    ]);
  };

  const handleAddSingleChoiceOptions = (item) => {
    let updatedForm = [...formElementsList];

    updatedForm = updatedForm.map((val) => {
      if (val.key === item.key) {
        val.optionsArray.push({
          key: v4(),
          label: `Type option ${val.optionsArray?.length + 1}`,
        });
      }
      return val;
    });
    setFormElementsList(updatedForm);
  };

  const handleMultipleChoiceChange = (item, option) => {
    console.log("Multi Handle Item--->", item);
    console.log("Multi Handle Option--->", option);
    console.log("Form, ", formElementsList);
    let updatedForm = [...formElementsList];
    updatedForm = updatedForm.map((val) => {
      if (val.key === item.key) {
        if (val.value.includes(option)) {
          //remove option
          const idx = val.value.indexOf(option);
          val.value.splice(idx, 1);
        } else {
          //add option

          val.value.push(option);
        }
      }
      return val;
    });
    setFormElementsList(updatedForm);
  };

  const getFormElementByType = (item) => {
    const { isRequired } = item;
    const type = item.editType;
    switch (type) {
      case "shortText":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Input Label"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="shortText"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}

            <div className="formBuilderTextFields">
              <TextField
                disabled={!checked || isViewing}
                label={checked ? null : "Short Text"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "300px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                name="shortText"
                onChange={(event) => handleInputChange(event, item)}
                value={item.value}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "fullName":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Full Name"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="fullName"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label="First Name"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "215px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                onChange={(event) =>
                  handleMultipleInputChange(event, item, "firstName")
                }
                disabled={!checked || isViewing}
              />
              <TextField
                label="Second Name"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                name="secondName"
                // value={formData.secondName}
                onChange={(event) =>
                  handleMultipleInputChange(event, item, "secondName")
                }
                style={{
                  marginLeft: "1vw",
                  width: "215px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                disabled={!checked || isViewing}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "heading":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Heading"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="heading"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label="heading"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "215px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                // name="firstName"
                value={item.value}
                onChange={(event) => handleInputChange(event, item)}
                disabled={!checked || isViewing}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "longText":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Long Text"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="longText"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label={checked ? null : "Long Text"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                name="longText"
                value={item.value}
                onChange={(event) => handleInputChange(event, item)}
                multiline
                disabled={!checked || isViewing}
                style={{ pointerEvents: checked ? "auto" : "none" }}
                inputProps={{
                  style: { height: isViewing ? "" : "190px", width: "600px" },
                }}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "paragraph":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Paragraph"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="longText"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label={checked ? null : "Paragraph"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "600px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                name="paragraph"
                value={item.value}
                onChange={(event) => handleInputChange(event, item)}
                multiline
                disabled={!checked || isViewing}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "dropDown":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Drop Down"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="dropDown"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <div className="textFields">
                {/* <InputLabel id="dropdown-label">Select an option</InputLabel> */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    onChange={(event) => handleInputChange(event, item)}
                    variant={isViewing ? "standard" : "outlined"}
                    InputProps={{ disableUnderline: isViewing ? true : false }}
                    style={{
                      width: "300px",
                      pointerEvents: checked ? "auto" : "none",
                    }}
                    defaultValue="1"
                    disabled={!checked || isViewing}
                    displayEmpty
                    value={item.value || "1"}
                  >
                    <MenuItem value="1" disabled>
                      Please select an option
                    </MenuItem>
                    {item.optionsArray.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {!checked && !item.isAddingOptionsForDropDown && (
                    <div
                      onClick={() => toggleEditOptionsForDropDown(item)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Edit Options
                    </div>
                  )}
                  {!checked && item.isAddingOptionsForDropDown && (
                    <TextField
                      multiline
                      minRows={4}
                      variant="outlined"
                      value={getOptionValues(item)}
                      onChange={(event) =>
                        handleAddDropdownOptions(event, item)
                      }
                    />
                  )}
                  {!checked && item.isAddingOptionsForDropDown && (
                    <div
                      onClick={() => toggleEditOptionsForDropDown(item)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Save Changes
                    </div>
                  )}
                </div>
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "singleChoice":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Single Choice"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "300px",
                }}
                name="singleChoice"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControl disabled={!checked || isViewing}>
                  <div style={{ display: "flex" }}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      {item.optionsArray.map((option, index) => (
                        <div key={option.key} style={{ display: "flex" }}>
                          <FormControlLabel
                            value={option.label}
                            control={
                              <Radio checked={item.value == option.label} />
                            }
                            onChange={(event) => handleInputChange(event, item)}
                          />
                          <div style={{ display: "flex" }}>
                            <TextField
                              placeholder={option.label}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                              }}
                              name="singleChoice"
                              onChange={(event) => {
                                option.label = event.target.value;
                              }}
                              disabled={!checked || isViewing}
                            />
                            {!checked && (
                              <div
                                onClick={() =>
                                  handleDeleteSingleChoiceOptions(
                                    item,
                                    option.key
                                  )
                                }
                              >
                                <ClearOutlined />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </FormControl>
                {!checked && (
                  <div
                    onClick={() => handleAddSingleChoiceOptions(item)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Add Options
                  </div>
                )}
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "multiSelect":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Multiple Choice"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="multipleChoice"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormGroup disabled={!checked || isViewing}>
                  {item.optionsArray.map((option) => (
                    <div key={option.key} style={{ display: "flex" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={!checked || isViewing}
                            onChange={() =>
                              handleMultipleChoiceChange(item, option)
                            }
                            checked={item.value.some(
                              (v) =>
                                v.key === option.key && v.label === option.label
                            )}
                          />
                        }
                      />
                      <div style={{ display: "flex" }}>
                        <TextField
                          placeholder={option.label}
                          variant="standard"
                          InputProps={{ disableUnderline: true }}
                          name="multipleChoice"
                          onChange={(event) => {
                            option.label = event.target.value;
                          }}
                          disabled={!checked || isViewing}
                        />
                        {!checked && (
                          <div
                            onClick={() =>
                              handleDeleteSingleChoiceOptions(item, option.key)
                            }
                          >
                            <ClearOutlined />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </FormGroup>
                {!checked && (
                  <div
                    onClick={() => handleAddSingleChoiceOptions(item)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Add Options
                  </div>
                )}
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "number":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Number"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="number"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label={checked ? null : "e.g., 23"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "300px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                name="number"
                type="number"
                onChange={(event) => handleInputChange(event, item)}
                disabled={!checked || isViewing}
                value={item.value}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "image":
        return (
          <div className="formComponentTitles">
            <div className="formBuilderTextFields">
              <div className="textFields">
                <div
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                  className={`${isRequired ? "requiredField" : ""}`}
                >
                  Select Image
                </div>
                <OutlinedInput
                  type="file"
                  id="image-input"
                  inputProps={{ accept: "image/*" }}
                  style={{ pointerEvents: checked ? "auto" : "none" }}
                />
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "fileUpload":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="File Upload"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "235px",
                }}
                name="fileUpload"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <div className="textFields">
                <InputLabel htmlFor="file-input">Browse Files</InputLabel>
                <OutlinedInput
                  type="file"
                  id="file-input"
                  disabled={!checked || isViewing}
                  style={{ pointerEvents: checked ? "auto" : "none" }}
                  inputProps={{
                    style: { height: "190px", width: "450px" },
                    multiple: true,
                  }}
                />
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "email":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Email"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="email"
                onChange={(event) => handleOnLabelChange(event, item)}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label={checked ? null : "Email"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                name="email"
                value={item.value}
                onChange={(event) => handleInputChange(event, item)}
                style={{
                  width: "300px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                disabled={!checked || isViewing}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "address":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Address"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="address"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <div style={{ width: "600px" }}>
                <TextField
                  label="Street Address"
                  variant={isViewing ? "standard" : "outlined"}
                  InputProps={{ disableUnderline: isViewing ? true : false }}
                  name="streetAddress"
                  // value={formData.streetAddress}
                  onChange={(event) =>
                    handleMultipleInputChange(event, item, "streetAddress")
                  }
                  disabled={!checked || isViewing}
                  style={{
                    width: "600px",
                    pointerEvents: checked ? "auto" : "none",
                  }}
                />
                <TextField
                  label="Street Address Line 2"
                  variant={isViewing ? "standard" : "outlined"}
                  InputProps={{ disableUnderline: isViewing ? true : false }}
                  name="streetAddressLine2"
                  // value={formData.streetAddressLine2}
                  onChange={(event) =>
                    handleMultipleInputChange(event, item, "streetAddressLine2")
                  }
                  disabled={!checked || isViewing}
                  style={{
                    marginTop: "30px",
                    width: "600px",
                    pointerEvents: checked ? "auto" : "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    width: "600px",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    label="City"
                    variant={isViewing ? "standard" : "outlined"}
                    InputProps={{ disableUnderline: isViewing ? true : false }}
                    name="city"
                    // value={formData.city}
                    onChange={(event) =>
                      handleMultipleInputChange(event, item, "city")
                    }
                    disabled={!checked || isViewing}
                    style={{
                      width: "280px",
                      pointerEvents: checked ? "auto" : "none",
                    }}
                  />
                  <TextField
                    label="State"
                    variant={isViewing ? "standard" : "outlined"}
                    InputProps={{ disableUnderline: isViewing ? true : false }}
                    name="state"
                    disabled={!checked || isViewing}
                    // value={formData.state}
                    onChange={(event) =>
                      handleMultipleInputChange(event, item, "state")
                    }
                    style={{
                      marginLeft: "1vw",
                      width: "280px",
                      pointerEvents: checked ? "auto" : "none",
                    }}
                  />
                </div>
                <TextField
                  label="Postal / Zip Code"
                  variant={isViewing ? "standard" : "outlined"}
                  InputProps={{ disableUnderline: isViewing ? true : false }}
                  name="zipCode"
                  disabled={!checked || isViewing}
                  // value={formData.zipCode}
                  onChange={(event) =>
                    handleMultipleInputChange(event, item, "zipCode")
                  }
                  style={{
                    marginTop: "30px",
                    width: "600px",
                    pointerEvents: checked ? "auto" : "none",
                  }}
                />
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "phone":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Phone Number"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="phone"
                onChange={(event) => handleOnLabelChange(event, item)}
              />
            )}
            <div className="formBuilderTextFields">
              <TextField
                label={checked ? null : "Phone"}
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                name="phone"
                value={item.value}
                onChange={(event) => handleInputChange(event, item)}
                disabled={!checked || isViewing}
                style={{
                  width: "300px",
                  pointerEvents: checked ? "auto" : "none",
                }}
                helperText={
                  isViewing ? null : "Please enter a valid phone number."
                }
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );

      case "datePicker":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Date"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "300px",
                }}
                name="date"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose Date"
                  //   value={date}
                  onChange={(newValue) => {
                    handleDateChange(newValue.toString(), item);
                  }}
                  disabled={!checked || isViewing}
                />
              </LocalizationProvider>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "time":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="time"
                variant={isViewing ? "standard" : "outlined"}
                InputProps={{ disableUnderline: isViewing ? true : false }}
                style={{
                  width: "300px",
                }}
                name="time"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <input
                value={item.value}
                type="time"
                onChange={(e) => handleTimeChange(e, item)}
                disabled={!checked || isViewing}
              />
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "richText":
        return (
          <div className="formComponentTitles" style={{ height: "335px" }}>
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Text"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="richText"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <ReactQuill
              style={{ height: "250px" }}
              readOnly={!checked || isViewing}
              onChange={(content) => handleContentChange(content, item)}
              value={item.value}
              theme="snow"
            />
            {/* </div> */}

            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "Json":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="JSON"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="json"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div className="formBuilderTextFields">
              <JSONEditor
                collapsible
                onChange={onJsonChange}
                view="dual"
                // viewOnly={!checked || isViewing}
                // id="a_unique_id"
                // onChange={(event) => console.log("jsonConsole", event)}
                // locale={locale}
                // width="100%"
                // height="320px"
              />
            </div>

            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      case "signature":
        return (
          <div className="formComponentTitles">
            {checked && (
              <div
                style={{ fontWeight: 600, fontSize: "1rem" }}
                className={`${isRequired ? "requiredField" : ""}`}
              >
                <span>{item.label}</span>
              </div>
            )}
            {!checked && (
              <TextField
                placeholder="Signature"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                style={{
                  width: "300px",
                }}
                name="signature"
                onChange={(event) => handleOnLabelChange(event, item)}
                value={item.label}
              />
            )}
            <div
              style={{
                border: "1px dotted black",
                height: "152px",
                width: "302px",
              }}
            >
              <div>
                <div>
                  <SignaturePad
                    canvasProps={{
                      width: 300,
                      height: 150,
                      className: "sigPad",
                    }}
                    ref={sigPadRef}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  style={{ border: "none", borderRadius: "10px" }}
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  style={{ border: "none", borderRadius: "10px" }}
                  onClick={() => handleTrim(item)}
                >
                  Sign
                </button>
              </div>
            </div>
            {item.hasError && (
              <span style={{ color: "red" }}>{item.errorMsg}</span>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    // <>
    //   {!formSubmitted ? (
    <>
      <div style={{ overflow: "auto", height: isInEditMode ? "70vh" : "72vh" }}>
        {formElementsList?.length > 0 ? (
          formElementsList.map((item) => {
            return (
              <div className="parent">
                <div
                  key={item.key}
                  className={`formElementWrapper ${
                    selectedElement?.key == item.key
                      ? !checked
                        ? "selected"
                        : ""
                      : ""
                  } `}
                  onClick={() => {
                    setSelectedElement && setSelectedElement(item);
                  }}
                >
                  {getFormElementByType(item)}
                </div>
                {!checked && (
                  <div className={!checked ? "setting-delete-icon" : ""}>
                    <div
                      className={!checked ? "settingIcon" : ""}
                      onClick={() => {
                        setDrawerType2 && setDrawerType2("permanent");
                        setSelectedElement && setSelectedElement(item);
                      }}
                    >
                      <SettingsOutlined style={{ color: "#ffffff" }} />
                    </div>

                    <div
                      className={!checked ? "deleteIcon" : ""}
                      onClick={() => handleOnClickDelete(item.key)}
                    >
                      <DeleteOutlined style={{ color: "#ffffff" }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className="clickToAdd"
            onClick={() => (isInEditMode ? setDrawerType("permanent") : null)}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {isInEditMode && (
                <OpenWith color="#636a96" style={{ marginRight: "0.5rem" }} />
              )}
              <Typography color="#636a96" style={{ marginLeft: "0.5rem" }}>
                {isInEditMode
                  ? "Click your first question here from the left"
                  : "No Properties Found"}
              </Typography>
            </div>
          </div>
        )}
        {formElementsList?.length > 0 && checked && !isViewing && (
          <div style={{ padding: "10px 8px" }}>
            <Button
              color="primary"
              variant="contained"
              // loading={loading}
              // loadingIndicator="Loading..."
              onClick={previewSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      {formSubmitted && (
        <div className="modalSuccess">
          <div className="modalSuccess-content">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" style={{ marginRight: "10px" }}>
                Published Successfully
              </Typography>
              <svg
                class="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>

            <button className="modalSuccess-button" onClick={handleModalClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </>

    // ) : (
    //   <div className="formBuilderInnerAfterSubmit">
    //     <img
    //       src={thankYou}
    //       alt="No Module"
    //       style={{ width: 153, maxWidth: 156, marginTop: 24 }}
    //     />
    //     <Typography variant="h2">Thank You!</Typography>
    //     <Typography color="#2C3345">
    //       Your submission has been received.
    //     </Typography>
    //   </div>
    // )}
    // </>
  );
};

export default MiddleForm;
