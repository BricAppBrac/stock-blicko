import { useEffect, useCallback, useState } from "react";
import * as XLSX from "xlsx";

const ReadSource = ({ fileUrl, handleDataRead }) => {
  console.log("ReadSource");
  console.log("fileUrl : " + fileUrl);

  const [dataArrays, setDataArrays] = useState({
    chavrilArray: [],
    opelArray: [],
    jumpyArray: [],
    partnerArray: [],
  });

  const [chavrilFound, setChavrilFound] = useState(false);
  const [opelFound, setOpelFound] = useState(false);
  const [jumpyFound, setJumpyFound] = useState(false);
  const [partnerFound, setPartnerFound] = useState(false);

  const readExcelFile = useCallback(
    (url) => {
      console.log("readExcelFile");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      xhr.onload = (e) => {
        const arraybuffer = xhr.response;
        const data = new Uint8Array(arraybuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Lecture du 2ème onglet
        const sheetName = workbook.SheetNames[1];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        let currentArray = null;
        const chavrilArray = [],
          opelArray = [],
          jumpyArray = [],
          partnerArray = [];

        jsonData.forEach((row) => {
          if (!row || row.length === 0) return; // Ignorer les lignes vides
          const secondColumnValue = row[1];

          if (secondColumnValue === "Chavril") {
            currentArray = chavrilArray;
            setChavrilFound(true);
          } else if (secondColumnValue === "Opel") {
            currentArray = opelArray;
            setOpelFound(true);
          } else if (secondColumnValue === "Jumpy") {
            currentArray = jumpyArray;
            setJumpyFound(true);
          } else if (secondColumnValue === "Partner") {
            currentArray = partnerArray;
            setPartnerFound(true);
          } else if (
            secondColumnValue === "" ||
            secondColumnValue === undefined
          ) {
            // fin d'un tableau, on ne récupère pas ces lignes
            console.log("fin des données");
            setChavrilFound(false);
            setOpelFound(false);
            setJumpyFound(false);
            setPartnerFound(false);
            currentArray = null;
          }
          if (
            currentArray &&
            row[1] !== "Chavril" &&
            row[1] !== "Opel" &&
            row[1] !== "Jumpy" &&
            row[1] !== "Partner"
          ) {
            // on renseigne le tableau du lieu de stockage concerné
            currentArray.push(row);
          }
        });

        // Ici, vous pouvez utiliser chavrilArray, opelArray, et jumpyArray
        console.log("chavrilArray");
        console.log(chavrilArray);
        console.log("opelArray");
        console.log(opelArray);
        console.log("jumpyArray");
        console.log(jumpyArray);
        console.log("partnerArray");
        console.log(partnerArray);

        // Appeler la fonction fournie pour transmettre les données à un autre composant
        handleDataRead(chavrilArray, opelArray, jumpyArray, partnerArray);
      };

      xhr.send();
    },
    [handleDataRead]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log("ReadSource - useEffect called");
    console.log("fileUrl : " + fileUrl);
    if (fileUrl) {
      readExcelFile(fileUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  // Ce composant n'affiche rien à l'écran
  return null;
};

export default ReadSource;
