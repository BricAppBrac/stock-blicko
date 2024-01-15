import React, { useState } from "react";
import ReadSource from "../components/ReadSource";

const UploadSource = () => {
  const [sourceName, setSourceName] = useState(null);
  const [sourceType, setSourceType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  let chavrilArray = [];
  let opelArray = [];
  let jumpyArray = [];
  let partnerArray = [];

  const [chavrilMat, setChavrilMat] = useState(null);
  const [opelMat, setOpelMat] = useState(null);
  const [jumpyMat, setJumpyMat] = useState(null);
  const [partnerMat, setPartnerMat] = useState(null);

  // Stocke le fichier sélectionné url et name
  const handleFileChange = (event) => {
    console.log("handleFileChange");
    const file = event.target.files[0];
    console.log("file.name");
    console.log(file.name);
    setSourceName(file.name);

    setFileUrl(URL.createObjectURL(file));
    console.log("fileUrl");
    console.log(fileUrl);
  };

  // Fonction pour traiter les données lues du fichier Xlsx
  const handleDataRead = (
    chavrilArray,
    opelArray,
    jumpyArray,
    partnerArray
  ) => {
    console.log("handleDataRead");
    console.log("chavrilArray");
    console.log(chavrilArray);
    console.log("opelArray");
    console.log(opelArray);
    console.log("jumpyArray");
    console.log(jumpyArray);
    console.log("partnerArray");
    console.log(partnerArray);
  };

  return (
    <div className="upload-content">
      <div className="upload-head">
        <div className="upload-title">
          <h3>*****************************</h3>
          <h3>FICHIER SOURCE A TRAITER :</h3>
          <h3>*****************************</h3>
        </div>

        <div className="source-name">
          <h3>*****************************</h3>
          <h3>
            {sourceName ? (
              <div>{sourceName}</div>
            ) : (
              <div className="upload-file">
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
              </div>
            )}
          </h3>
        </div>
      </div>
      <div className="source-type">
        <h3>*****************************</h3>
        <h3>CHAVRIL</h3>
        <h3>
          {chavrilArray ? (
            <select onChange={(e) => setChavrilMat(e.target.value)}>
              <option value="">Choisissez le matériel</option>
            </select>
          ) : null}
        </h3>
      </div>
      <div className="source-type">
        <h3>*****************************</h3>
        <h3>OPEL</h3>
        <h3>
          {chavrilArray ? (
            <select onChange={(e) => setOpelMat(e.target.value)}>
              <option value="">Choisissez le matériel</option>
            </select>
          ) : null}
        </h3>
      </div>
      <div className="source-type">
        <h3>*****************************</h3>
        <h3>JUMPY</h3>
        <h3>
          {chavrilArray ? (
            <select onChange={(e) => setJumpyMat(e.target.value)}>
              <option value="">Choisissez le matériel</option>
            </select>
          ) : null}
        </h3>
      </div>
      <div className="source-type">
        <h3>*****************************</h3>
        <h3>PARTNER</h3>
        <h3>
          {chavrilArray ? (
            <select onChange={(e) => setPartnerMat(e.target.value)}>
              <option value="">Choisissez le matériel</option>
            </select>
          ) : null}
        </h3>
      </div>
      <div className="list-content">
        <ReadSource fileUrl={fileUrl} handleDataRead={handleDataRead} />
      </div>
    </div>
  );
};

export default UploadSource;
