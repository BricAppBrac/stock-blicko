import { useEffect, useCallback, useState } from "react";
import * as XLSX from "xlsx";
import GenerateXlsx from "./GenerateXlsx";
import StockChavril from "./StockChavril";
import StockOpel1 from "./StockOpel1";
import StockOpel2 from "./StockOpel2";
import StockJumpy from "./StockJumpy";
import StockPartner from "./StockPartner";

const UploadSource = () => {
  const [sourceName, setSourceName] = useState(null);
  const [sourceType, setSourceType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNameCible, setFileNameCible] = useState(null);
  const [isFileNameCibleValidated, setIsFileNameCibleValidated] =
    useState(false);

  // Tableaux Source
  const [chavrilArray, setChavrilArray] = useState([]);
  const [opel1Array, setOpel1Array] = useState([]);
  const [opel2Array, setOpel2Array] = useState([]);
  const [jumpyArray, setJumpyArray] = useState([]);
  const [partnerArray, setPartnerArray] = useState([]);

  // Tableaux MAJ
  const [chavrilArray2, setChavrilArray2] = useState([]);
  const [opel1Array2, setOpel1Array2] = useState([]);
  const [opel2Array2, setOpel2Array2] = useState([]);
  const [jumpyArray2, setJumpyArray2] = useState([]);
  const [partnerArray2, setPartnerArray2] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [chavrilFound, setChavrilFound] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [opel1Found, setOpel1Found] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [opel2Found, setOpel2Found] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [jumpyFound, setJumpyFound] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [partnerFound, setPartnerFound] = useState(false);

  // Lecture du Fichier Source
  const readExcelFile = useCallback((url) => {
    console.log("readExcelFile");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = (e) => {
      const arraybuffer = xhr.response;
      const data = new Uint8Array(arraybuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Lecture du 1er onglet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let currentArray = null;
      const chavrilArray = [],
        opel1Array = [],
        opel2Array = [],
        jumpyArray = [],
        partnerArray = [];
      // Dispatch en 4 tableaux selon lieu de stockage
      jsonData.forEach((row) => {
        if (!row || row.length === 0) return; // Ignorer les lignes vides
        const secondColumnValue = row[1];

        if (secondColumnValue === "Chavril") {
          currentArray = chavrilArray;
          setChavrilFound(true);
        } else if (secondColumnValue === "Opel1") {
          currentArray = opel1Array;
          setOpel1Found(true);
        } else if (secondColumnValue === "Opel2") {
          currentArray = opel2Array;
          setOpel1Found(true);
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

          setChavrilFound(false);
          setOpel1Found(false);
          setOpel2Found(false);
          setJumpyFound(false);
          setPartnerFound(false);
          currentArray = null;
        }
        if (
          currentArray &&
          row[1] !== "Chavril" &&
          row[1] !== "Opel1" &&
          row[1] !== "Opel2" &&
          row[1] !== "Jumpy" &&
          row[1] !== "Partner"
        ) {
          // on renseigne le tableau du lieu de stockage concerné
          currentArray.push(row);
        }
      });

      // Après avoir lu et traité les données, on initialise les tableaux Source et les tableaux à MAJ :
      setChavrilArray(chavrilArray);
      setOpel1Array(opel1Array);
      setOpel2Array(opel2Array);
      setJumpyArray(jumpyArray);
      setPartnerArray(partnerArray);
      setChavrilArray2(chavrilArray);
      setOpel1Array2(opel1Array);
      setOpel2Array2(opel2Array);
      setJumpyArray2(jumpyArray);
      setPartnerArray2(partnerArray);
    };

    xhr.send();
  }, []);

  const handleFileNameCibleValidation = () => {
    setIsFileNameCibleValidated(true);
  };

  // Initialisation des tableaux à MAJ à partir des tableaux source
  const handleArray2Init = () => {
    ///////// CHAVRIL ////////////

    // Modifier les éléments de chavrilArray2
    let arrayW = [];
    arrayW = chavrilArray2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setChavrilArray2(arrayW);
    console.log("chavrilArray2");
    console.log(arrayW);

    ////////   OPEL1 //////////////////

    // Modifier les éléments de opel1Array2
    arrayW = [];
    arrayW = opel1Array2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setOpel1Array2(arrayW);
    console.log("opel1Array2");
    console.log(arrayW);

    ////////   OPEL2 //////////////////

    // Modifier les éléments de opel2Array2
    arrayW = [];
    arrayW = opel2Array2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setOpel2Array2(arrayW);
    console.log("opel2Array2");
    console.log(arrayW);

    // ///////  JUMPY ///////////

    // Modifier les éléments de jumpyArray2
    arrayW = [];
    arrayW = jumpyArray2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setJumpyArray2(arrayW);
    console.log("jumpyArray2");
    console.log(arrayW);
    ///////// PARTNER //////////

    // Modifier les éléments de partnerArray2
    arrayW = [];
    arrayW = partnerArray2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setPartnerArray2(arrayW);
    console.log("partnerArray2");
    console.log(arrayW);
  };

  // Stocke le fichier sélectionné url et name
  const handleFileChange = (event) => {
    console.log("handleFileChange");
    const file = event.target.files[0];
    console.log("file.name");
    console.log(file.name);
    setSourceName(file.name);

    setFileUrl(URL.createObjectURL(file));
  };

  const handleFileNameMAJ = (e) => {
    setSourceType(e.target.value);
    let fileName = sourceName;

    // Retirer '.xlsx' si 'sourceName' se termine par '.xlsx'
    if (sourceName.endsWith(".xlsx")) {
      fileName = sourceName.slice(0, -5); // Enlever les 5 derniers caractères ('.xlsx')
    }
    // Retirer '.xls' si 'sourceName' se termine par '.xls'
    else if (sourceName.endsWith(".xls")) {
      fileName = sourceName.slice(0, -4); // Enlever les 4 derniers caractères ('.xls')
    }

    setFileNameCible(fileName);
  };

  useEffect(() => {
    if (fileUrl) {
      readExcelFile(fileUrl);
    }
  }, [fileUrl, readExcelFile]);

  // eslint-disable-next-line
  useEffect(() => {
    // Cette fonction sera appelée chaque fois que chavrilArray (ou tout autre état mentionné) est mis à jour.
    // Initialisation des tableaux à MAJ

    handleArray2Init();
    // eslint-disable-next-line
  }, [chavrilArray, opel1Array, opel2Array, jumpyArray, partnerArray]);

  return (
    <div className="upload-content">
      <div className="upload-head">
        <div className="upload-title">
          <h3>*****************************</h3>
          <h3>FICHIER SOURCE A TRAITER :</h3>
          <h3>*****************************</h3>
        </div>

        <div className="source-name">
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
        <div className="source-type">
          <h3>*****************************</h3>

          <h3>
            {!sourceType ? (
              <select onChange={handleFileNameMAJ}>
                <option value="">Création ou MAJ?</option>
                <option value="Creation">Création</option>
                <option value="MAJ">MAJ</option>
              </select>
            ) : (
              <div className="fichierCible">
                <h3>
                  {sourceType === "Creation" && "Création"}
                  {sourceType === "MAJ" && "MAJ"}
                </h3>
                {sourceType === "Creation" && !isFileNameCibleValidated && (
                  <div className="div">
                    <input
                      type="text"
                      name="nomFichierMAJ"
                      id="nomFichierMAJ"
                      placeholder="Entrez le nom du fichier à créer"
                      onChange={(e) => setFileNameCible(e.target.value)}
                    />
                    <button onClick={handleFileNameCibleValidation}>
                      Valider
                    </button>
                  </div>
                )}
                {sourceType === "Creation" && isFileNameCibleValidated && (
                  <h3>{fileNameCible}.xlsx</h3>
                )}
                {sourceType === "MAJ"}
              </div>
            )}
          </h3>
        </div>
      </div>
      {sourceName &&
      ((sourceType === "Creation" && isFileNameCibleValidated) ||
        sourceType === "MAJ") ? (
        <div className="mat">
          <div className="mat-type-bloc">
            <StockChavril
              chavrilArray2={chavrilArray2}
              setChavrilArray2={setChavrilArray2}
              chavrilArray={chavrilArray}
              sourceName={sourceName}
            />
          </div>
          <div className="mat-type-bloc">
            <StockOpel1
              opel1Array2={opel1Array2}
              setOpel1Array2={setOpel1Array2}
              opel1Array={opel1Array}
              sourceName={sourceName}
            />
          </div>
          <div className="mat-type-bloc">
            <StockOpel2
              opel2Array2={opel2Array2}
              setOpel2Array2={setOpel2Array2}
              opel2Array={opel2Array}
              sourceName={sourceName}
            />
          </div>
          <div className="mat-type-bloc">
            <StockJumpy
              jumpyArray2={jumpyArray2}
              setJumpyArray2={setJumpyArray2}
              jumpyArray={jumpyArray}
              sourceName={sourceName}
            />
          </div>
          <div className="mat-type-bloc">
            <StockPartner
              partnerArray2={partnerArray2}
              setPartnerArray2={setPartnerArray2}
              partnerArray={partnerArray}
              sourceName={sourceName}
            />
          </div>

          <div className="generate-doc">
            <GenerateXlsx
              chavrilArray2={chavrilArray2}
              opel1Array2={opel1Array2}
              opel2Array2={opel2Array2}
              jumpyArray2={jumpyArray2}
              partnerArray2={partnerArray2}
              fileNameCible={fileNameCible}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UploadSource;
