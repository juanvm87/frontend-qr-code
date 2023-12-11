import {
  Button,
  Drawer,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import dayjs from "dayjs";

import "./FormBuilderSidebar.css";

import { v4 } from "uuid";
import {
  AccessTimeOutlined,
  Add,
  ArrowDropDownOutlined,
  CalendarMonthOutlined,
  CallOutlined,
  CheckBoxOutlined,
  Clear,
  DataObjectOutlined,
  DriveFileRenameOutlineOutlined,
  EmailOutlined,
  FileUploadOutlined,
  FormatColorTextOutlined,
  FormatPaintOutlined,
  ImageOutlined,
  LocationCityOutlined,
  Looks3Outlined,
  NotesOutlined,
  RadioButtonCheckedOutlined,
  ShortTextOutlined,
  SubjectOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getThemeGradient } from "../../utils/Theme";
import MiddleForm from "./MiddleForm";

const useStyles = makeStyles({
  drawer: {
    height: "100%",
  },
  drawerPaper: {
    position: "static",
    width: "100%",
    height: "100%",
    background: "#3e4652",
    color: "white",
  },
});

const FormBuilderSidebar = () => {
  const classes = useStyles();

  const [drawerType, setDrawerType] = useState("permanent");
  const [drawerType2, setDrawerType2] = useState("temporary");
  const [formElementsList, setFormElementsList] = useState([]);
  const [selectedElement, setSelectedElement] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [checked, setChecked] = useState(false);

  const handlePreviewChange = () => {
    setChecked((prev) => !prev);
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  };

  const handleInputChange = (event, item) => {
    const { value } = event.target;
    setFormElementsList((prev) => [
      ...prev.map((val) => {
        if (val.key === item.key) {
          val.value = value;
        }
        return val;
      }),
    ]);
  };

  const handleOnClickBasicElements = (item) => {
    const tempArray = [...formElementsList];
    // tempArray.sort((a, b) => a.id - b.id);

    item.key =
      (tempArray[tempArray.length - 1]
        ? tempArray[tempArray.length - 1].key
        : 0) + 1;
    item.isRequired = false;
    delete item.icon;
    setFormElementsList((prev) => [...prev, item]);
  };

  const isValidated = () => {
    let canSubmit = true;
    for (let item of formElementsList) {
      item.hasError = false;
      if (typeof item.value === "object" && item.isRequired) {
        if (item.value.length > -1) {
          if (item.value.length === 0) {
            item.hasError = true;
            item.errorMsg = `${item.label} is required field`;
            canSubmit = false;
            break;
          }
        } else {
          for (let i of Object.entries(item.value)) {
            if (!i[1]) {
              item.hasError = true;
              item.errorMsg = `Fill all fields of ${item.label}`;
              canSubmit = false;
              break;
            }
          }
        }
      } else if (!item.value.length > 0 && item.isRequired) {
        canSubmit = false;
        item.hasError = true;
        item.errorMsg = `${item.label} is required field`;
      }
    }
    setFormElementsList([...formElementsList]);
    return canSubmit;
  };

  const previewSubmit = () => {
    if (checked) {
      if (isValidated()) {
        setFormSubmitted(true);
      }
    }
  };

  const handleOnClickDelete = (key) => {
    const filteredArray = formElementsList.filter((obj) => obj.key != key);
    setFormElementsList(filteredArray);
  };

  const closeSuccessModal = () => {
    setFormSubmitted(false);
    setChecked((prev) => !prev);
  };

  const formElements = [
    {
      id: 1,
      name: "Heading",
      icon: <DriveFileRenameOutlineOutlined style={{ color: "white" }} />,
      label: "heading",
      field: "Heading",
      placeholder: "",
      type: "heading",
      editType: "heading",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      value: "",
      errorMsg: "",
      hasError: false,
      dataType: "string",
    },
    {
      id: 2,
      name: "Full Name",
      icon: <DriveFileRenameOutlineOutlined style={{ color: "white" }} />,
      label: "Name",
      field: "fullName",
      placeholder: "",
      type: "fullName",
      editType: "fullName",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      value: { firstName: "", secondName: "" },
      errorMsg: { firstName: "", second: "" },
      hasError: false,
      dataType: "string",
    },
    {
      id: 3,
      name: "E-Mail",
      icon: <EmailOutlined style={{ color: "white" }} />,
      label: "Email",
      field: "email",
      placeholder: "",
      type: "email",
      editType: "email",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 4,
      name: "Address",
      icon: <LocationCityOutlined style={{ color: "white" }} />,
      label: "Address",
      field: "address",
      placeholder: "",
      type: "address",
      editType: "address",
      validation: { isRequired: "", min: "", max: "" },
      value: {
        city: "",
        streetAddress: "",
        streetAddressLine2: "",
        state: "",
        zipCode: "",
      },
      errorMsg: {
        city: "",
        streetAddress: "",
        streetAddressLine2: "",
        state: "",
        zipCode: "",
      },
      hasError: false,
      widthSize: "",
      dataType: "string",
    },
    {
      id: 5,
      name: "Phone",
      icon: <CallOutlined style={{ color: "white" }} />,
      label: "Phone Number",
      field: "phone",
      placeholder: "",
      type: "phone",
      editType: "phone",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "number",
    },
    {
      id: 6,
      name: "Date Picker",
      icon: <CalendarMonthOutlined style={{ color: "white" }} />,
      label: "Date",
      field: "date",
      placeholder: "",
      type: "text",
      editType: "datePicker",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 7,
      name: "Time",
      icon: <AccessTimeOutlined style={{ color: "white" }} />,
      label: "time",
      field: "time",
      placeholder: "",
      type: "time",
      editType: "time",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 8,
      name: "Rich Text",
      icon: <SubjectOutlined style={{ color: "white" }} />,
      label: "RichText",
      field: "text",
      placeholder: "",
      type: "richText",
      editType: "richText",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 9,
      name: "JSON",
      icon: <DataObjectOutlined style={{ color: "white" }} />,
      label: "Json",
      field: "text",
      placeholder: "",
      type: "json",
      editType: "Json",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "json",
    },
    {
      id: 10,
      name: "Signature",
      icon: <DataObjectOutlined style={{ color: "white" }} />,
      label: "signature",
      field: "sign",
      placeholder: "",
      type: "signature",
      editType: "signature",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
  ];

  const basicElements = [
    {
      id: 1,
      name: "Short Text",
      icon: <ShortTextOutlined style={{ color: "white" }} />,
      label: "Label",
      field: "shortText",
      placeholder: "",
      type: "text",
      editType: "shortText",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 2,
      name: "Long Text",
      icon: <NotesOutlined style={{ color: "white" }} />,
      label: "Label",
      field: "longText",
      placeholder: "",
      type: "description",
      editType: "longText",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 3,
      name: "Paragraph",
      icon: <FormatColorTextOutlined style={{ color: "white" }} />,
      label: "Paragraph",
      field: "paragraph",
      placeholder: "",
      type: "description",
      editType: "paragraph",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 4,
      name: "Dropdown",
      icon: <ArrowDropDownOutlined style={{ color: "white" }} />,
      label: "Label",
      field: "dropdown",
      placeholder: "",
      type: "dropDown",
      editType: "dropDown",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      optionsArray: ["option1", "option2", "option3", "option4"],
      isAddingOptionsForDropDown: false,
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 5,
      name: "Single Choice",
      icon: <RadioButtonCheckedOutlined style={{ color: "white" }} />,
      label: "Label",
      field: "singleChoice",
      placeholder: "",
      type: "singleChoice",
      optionsArray: [
        { key: v4(), label: "Type option 1" },
        { key: v4(), label: "Type option 2" },
        { key: v4(), label: "Type option 3" },
        { key: v4(), label: "Type option 4" },
      ],
      editType: "singleChoice",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      isAddingOptionsForSingleChoice: false,
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 6,
      name: "Multiple Choice",
      icon: <CheckBoxOutlined style={{ color: "white" }} />,
      label: "Label",
      field: "multiselect",
      placeholder: "",
      type: "multiselect",
      editType: "multiSelect",
      validation: { isRequired: "", min: "", max: "" },
      optionsArray: [
        { key: v4(), label: "Type option 1" },
        { key: v4(), label: "Type option 2" },
        { key: v4(), label: "Type option 3" },
        { key: v4(), label: "Type option 4" },
      ],
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: [],
      dataType: "array",
    },
    {
      id: 7,
      name: "Number",
      icon: <Looks3Outlined style={{ color: "white" }} />,
      label: "Number",
      field: "number",
      placeholder: "",
      type: "number",
      editType: "number",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "number",
    },
    {
      id: 8,
      name: "Image",
      icon: <ImageOutlined style={{ color: "white" }} />,
      label: "Image",
      field: "image",
      placeholder: "",
      type: "image",
      editType: "fileUpload",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
    {
      id: 9,
      name: "File Upload",
      icon: <FileUploadOutlined style={{ color: "white" }} />,
      label: "File Upload",
      field: "files",
      placeholder: "",
      type: "multipleFiles",
      editType: "fileUpload",
      validation: { isRequired: "", min: "", max: "" },
      widthSize: "",
      hasError: false,
      errorMsg: "",
      value: "",
      dataType: "string",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "100%",
          background: "#FBFBFB",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "250px" }}>
          <Drawer
            className={classes.drawer}
            variant={drawerType}
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <div style={{ overflow: "auto", height: "85vh" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    background: "#3e4652",
                    color: "white",
                    width: "100%",
                    paddingLeft: "5%",
                    overflow: "auto",
                  }}

                  //   onClick={() => navigateTo(`/admin/${applicationName}/dashboard`)}
                >
                  <Typography variant="h6">Elements</Typography>
                </div>
              </div>

              <List>
                {formElements.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => handleOnClickBasicElements(item)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>

              <div
                style={{
                  background: "#3e4652",
                  color: "white",
                  width: "54%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Basic Elements</Typography>
              </div>
              <List>
                {basicElements.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => handleOnClickBasicElements(item)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </div>

        <div style={{ width: "50%" }}>
          <div className="formBuilderOuter">
            <div className="formBuilderInner">
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Add Elements
                </Typography>
              </div>
              <MiddleForm
                formSubmitted={formSubmitted}
                formElementsList={formElementsList}
                setFormElementsList={(elements) =>
                  setFormElementsList(elements)
                }
                setFormSubmitted={(boolean) => setFormSubmitted(boolean)}
                selectedElement={selectedElement}
                checked={checked}
                setSelectedElement={(item) => setSelectedElement(item)}
                setDrawerType2={(type) => setDrawerType2(type)}
                handleOnClickDelete={(item) => handleOnClickDelete(item)}
                setDrawerType={(type) => setDrawerType(type)}
                previewSubmit={previewSubmit}
                closeSuccessModal={closeSuccessModal}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "300px",
            right: 0,
            height: "80%",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          background: getThemeGradient(),
          position: "fixed",
          alignItems: "center",
          bottom: "20px",
          padding: "0.3% 0%",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "0 1%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handlePreviewChange}
            style={{ color: "white", borderColor: "white" }}
          >
            {!checked ? "Preview" : "Back"}
          </Button>
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          {!checked ? (
            <Button
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              SAVE
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormBuilderSidebar;
