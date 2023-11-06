import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getQrLink } from "../../services/RestApi";
import "./DynamicQr.css";

const DynamicQr = () => {
  const idFromURL = useParams().id;
  const navigateTo = useNavigate();

  useEffect(() => {
    if (idFromURL) {
      const retrieveData = async () => {
        try {
          const response = await getQrLink(idFromURL);
          console.log(response);
          setTimeout(() => {
            window.location.href = response.data;
          }, 5000);
        } catch (error) {
          console.error("Error fetching QR code data:", error);
        }
      };

      retrieveData(); // Call the function to fetch data
    } else {
      navigateTo("/login");
    }
  }, []);

  return (
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
  );
};

export default DynamicQr;
