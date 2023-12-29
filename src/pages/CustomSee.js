import React, { useEffect, useRef, useState } from "react";
import MiddleForm from "../components/FormBuilder/MiddleForm";
import { useNavigate, useParams } from "react-router";
import "./DynamicQr.css";
import { addStatistic, getIPInfo, getQr, updateQr } from "../services/RestApi";
import logoNotFound from "../components/Images/notFoundQr.png";
import { Card } from "@material-ui/core";
import QRCode from "react-qr-code";
import { handleformattedDateTime } from "../components/helperFunction/formatedDate";

function CustomSee() {
  const idFromURL = useParams().id;
  const navigateTo = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);
  const [isQr, setIsQr] = useState(false);
  const [qr, setQr] = useState({});
  const [formElementsList, setFormElementsList] = useState([]);
  const qrCodeRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const saveLocation = async (qrId) => {
    try {
      const reply = await getIPInfo();
      const newLocation = {
        qrId: qrId,
        city: reply.city,
        region: reply.region,
        country: reply.country,
        loc: reply.loc,
        timezone: reply.timezone,
      };

      const statisticAdded = await addStatistic(newLocation);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };
  const closeSuccessModal = () => {
    setFormSubmitted(false);
    closeTab();
  };
  const handleSubmitForm = async () => {
    try {
      const formResponses = formElementsList.reduce((acc, field) => {
        // Check if field.value is an object
        if (typeof field.value === "object" && field.value !== null) {
          // Convert object to string
          acc[field.name] = Object.entries(field.value)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
        } else {
          acc[field.name] = field.value;
        }
        return acc;
      }, {});

      const submitedForm = await updateQr(idFromURL, { formResponses });
      if (submitedForm.status === 200) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const getQrInfo = async () => {
      if (idFromURL) {
        const newQr = await getQr(idFromURL);

        setTimeout(() => {
          if (newQr) {
            setQr(newQr.data);
            setFormElementsList(newQr.data.input);
            saveLocation(idFromURL);
            setIsQr(true);
          } else {
            setIsNotFound(true);
          }
        }, 7000);
      } else {
        setTimeout(() => {
          setIsNotFound(true);
        }, 7000);
      }
    };
    getQrInfo();
  }, []);

  return (
    <div>
      {isNotFound && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={logoNotFound}
            alt="No found"
          />
        </div>
      )}
      {!isQr && !isNotFound && (
        <div className="container-dynamic">
          <h1>
            <span class="let1">R</span>
            <span class="let2">e</span>
            <span class="let3">d</span>
            <span class="let4">i</span>
            <span class="let5">r</span>
            <span class="let6">e</span>
            <span class="let7">c</span>
            <span class="let8">t</span>
            <span class="let9">i</span>
            <span class="let10">n</span>
            <span class="let11">g</span>
          </h1>
        </div>
      )}
      {isQr && !isNotFound && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          <div
            style={{ margin: "0px", padding: "10px", width: "95%" }}
            className="profile-heading-info2"
          >
            <div className="container-header2">
              <div className="box-info-search-info">
                <QRCode
                  size={115}
                  id={qr.pin}
                  className="qr-code-view"
                  value={`http://${window.location.hostname}:3000/dynamic-qr/${qr._id}`}
                  ref={qrCodeRef}
                />
              </div>
              <div className="container-qr-info">
                <h2 className="h2-title">{qr.title}</h2>
                <h4 className="h4-type">{"CUSTOM QR"}</h4>
                <h4 className="h4-type">
                  Created: {handleformattedDateTime(qr.createdAt)}
                </h4>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                height: "72vh",
                padding: "10px",
                width: "34rem",
                borderRadius: "10px",
              }}
            >
              <MiddleForm
                isFormView={qr.isFormDisplay}
                previewSubmit={true}
                checked={true}
                formElementsList={formElementsList}
                setFormElementsList={setFormElementsList}
                handleSubmitForm={handleSubmitForm}
                formSubmitted={formSubmitted}
                closeSuccessModal={closeSuccessModal}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSee;
