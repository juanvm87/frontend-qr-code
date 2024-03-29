import React, { useEffect, useState } from "react";
import FormBuilderSidebar from "../components/FormBuilder/FormBuilderSidebar";
import { useParams } from "react-router";
import { getQr } from "../services/RestApi";

const CustomEdit = () => {
  const idFromURL = useParams().id;
  const [qr, setQr] = useState({});
  useEffect(() => {
    const getQrInfo = async () => {
      if (idFromURL) {
        const newQr = await getQr(idFromURL);
        setQr(newQr.data);
      }
    };

    getQrInfo();
  }, [idFromURL]);

  return (
    <>
      {qr.input && (
        <FormBuilderSidebar
          qrInfo={qr.input}
          isEditPage={true}
          editQrId={idFromURL}
        />
      )}
    </>
  );
};

export default CustomEdit;
