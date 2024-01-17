import React from "react";
import { saveAs } from "file-saver";
// import PizZip from "pizzip";

const GenerateXlsx = (
  chavrilArray2,
  opelArray2,
  jumpyArray2,
  partnerArray2,
  fileNameCible
) => {
  const generateDoc = async () => {
    console.log("generateDoc");
  };

  return (
    <div className="generate-content">
      <h2>Création ou MAJ du Document Xlsx</h2>
      <h2>***************************</h2>

      <div className="generate">
        <button onClick={generateDoc}>
          Cliquer pour générer le document Cible
        </button>
      </div>
    </div>
  );
};

export default GenerateXlsx;
