import { useEffect, useCallback, useState } from "react";
import * as XLSX from "xlsx";
import GenerateXlsx from "./GenerateXlsx";

const UploadSource = () => {
  const [sourceName, setSourceName] = useState(null);
  const [sourceType, setSourceType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNameCible, setFileNameCible] = useState(null);
  const [isFileNameCibleValidated, setIsFileNameCibleValidated] =
    useState(false);

  // Tableaux Source
  const [chavrilArray, setChavrilArray] = useState([]);
  const [opelArray, setOpelArray] = useState([]);
  const [jumpyArray, setJumpyArray] = useState([]);
  const [partnerArray, setPartnerArray] = useState([]);

  // Tableaux MAJ
  const [chavrilArray2, setChavrilArray2] = useState([]);
  const [opelArray2, setOpelArray2] = useState([]);
  const [jumpyArray2, setJumpyArray2] = useState([]);
  const [partnerArray2, setPartnerArray2] = useState([]);

  const [searchTermChavril, setSearchTermChavril] = useState("");
  const [searchTermOpel, setSearchTermOpel] = useState("");
  const [searchTermJumpy, setSearchTermJumpy] = useState("");
  const [searchTermPartner, setSearchTermPartner] = useState("");

  const [chavrilMat, setChavrilMat] = useState(null);
  const [opelMat, setOpelMat] = useState(null);
  const [jumpyMat, setJumpyMat] = useState(null);
  const [partnerMat, setPartnerMat] = useState(null);

  const [chavrilFound, setChavrilFound] = useState(false);
  const [opelFound, setOpelFound] = useState(false);
  const [jumpyFound, setJumpyFound] = useState(false);
  const [partnerFound, setPartnerFound] = useState(false);

  let rowIndexW = null;
  const [selectedRowIndexChavril, setSelectedRowIndexChavril] = useState(null);
  const [selectedRowIndexOpel, setSelectedRowIndexOpel] = useState(null);
  const [selectedRowIndexJumpy, setSelectedRowIndexJumpy] = useState(null);
  const [selectedRowIndexPartner, setSelectedRowIndexPartner] = useState(null);

  const [tempValueChavril, setTempValueChavril] = useState("");
  const [tempValueOpel, setTempValueOpel] = useState("");
  const [tempValueJumpy, setTempValueJumpy] = useState("");
  const [tempValuePartner, setTempValuePartner] = useState("");

  const [selectedMatChavril, setSelectedMatChavril] = useState("");
  const [selectedMatOpel, setSelectedMatOpel] = useState("");
  const [selectedMatJumpy, setSelectedMatJumpy] = useState("");
  const [selectedMatPartner, setSelectedMatPartner] = useState("");

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

      // Lecture du 2ème onglet
      const sheetName = workbook.SheetNames[1];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let currentArray = null;
      const chavrilArray = [],
        opelArray = [],
        jumpyArray = [],
        partnerArray = [];
      // Dispatch en 4 tableaux selon lieu de stockage
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

      console.log("chavrilArray");
      console.log(chavrilArray);
      console.log("opelArray");
      console.log(opelArray);
      console.log("jumpyArray");
      console.log(jumpyArray);
      console.log("partnerArray");
      console.log(partnerArray);
      // Après avoir lu et traité les données, on initialise les tableaux Source et les tableaux à MAJ :
      setChavrilArray(chavrilArray);
      setOpelArray(opelArray);
      setJumpyArray(jumpyArray);
      setPartnerArray(partnerArray);
      setChavrilArray2(chavrilArray);
      setOpelArray2(opelArray);
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
    console.log("handleArray2Init");
    ///////// CHAVRIL ////////////
    console.log("CHAVRIL");
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

    ////////   OPEL //////////////////
    console.log("OPEL");
    // Modifier les éléments de opelArray2
    arrayW = [];
    arrayW = opelArray2.map((item) => {
      return [
        ...item.slice(0, 2), // Garder les éléments avant l'index 2
        item[3], // Déplacer l'élément de l'index 3 à l'index 2
        ...item.slice(3), // Garder les éléments après l'index 2
      ];
    });
    setOpelArray2(arrayW);
    console.log("opelArray2");
    console.log(arrayW);
    // ///////  JUMPY ///////////
    console.log("JUMPY");
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
    console.log("PARTNER");
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

  // Fonction pour filtrer les options basées sur la saisie de l'utilisateur
  const filterOptions = (array, searchTerm) => {
    console.log("filterOptions");
    console.log("searchTerm");
    console.log(searchTerm);

    const filteredArray = array
      .filter((item) =>
        item[1].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item) => item[1]); // Filtre puis retourne les valeurs de l'index 1

    // Afficher le résultat du filtre
    console.log("filteredArray");
    console.log(filteredArray);

    // Retourner le résultat filtré
    return filteredArray;
  };

  // Fonction pour sélectionner les options basées sur les tableaux
  const selectOptions = (array) => {
    console.log("selectOptions");
    return array.map((item) => item[1]); // Retourne les valeurs de l'index 1
  };

  // Fonction pour afficher le nombre à modifier après sélection du matériel
  const handleSelectMat = (arrayName, array, selectedValue) => {
    console.log("handleSelectMat");

    switch (arrayName) {
      case "Chavril":
        setChavrilMat(selectedValue);
        setSelectedMatChavril(selectedValue);
        rowIndexW = array.findIndex((row) => row[1] === selectedValue);
        setSelectedRowIndexChavril(rowIndexW);
        if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
          setTempValueChavril(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
        } else {
          setTempValueChavril(""); // Réinitialiser si l'élément sélectionné n'est pas valide
        }
        rowIndexW = null;
        break;
      case "Opel":
        setOpelMat(selectedValue);
        setSelectedMatOpel(selectedValue);
        // Trouvez l'index de la ligne correspondante dans chavrilArray2
        rowIndexW = array.findIndex((row) => row[1] === selectedValue);
        setSelectedRowIndexOpel(rowIndexW);
        if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
          setTempValueOpel(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
        } else {
          setTempValueOpel(""); // Réinitialiser si l'élément sélectionné n'est pas valide
        }
        rowIndexW = null;
        break;
      case "Jumpy":
        setJumpyMat(selectedValue);
        setSelectedMatJumpy(selectedValue);
        // Trouvez l'index de la ligne correspondante dans chavrilArray2
        rowIndexW = array.findIndex((row) => row[1] === selectedValue);
        setSelectedRowIndexJumpy(rowIndexW);
        if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
          setTempValueJumpy(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
        } else {
          setTempValueJumpy(""); // Réinitialiser si l'élément sélectionné n'est pas valide
        }
        rowIndexW = null;
        break;
      case "Partner":
        setPartnerMat(selectedValue);
        setSelectedMatPartner(selectedValue);
        // Trouvez l'index de la ligne correspondante dans chavrilArray2
        rowIndexW = array.findIndex((row) => row[1] === selectedValue);
        setSelectedRowIndexPartner(rowIndexW);
        if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
          setTempValuePartner(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
        } else {
          setTempValuePartner(""); // Réinitialiser si l'élément sélectionné n'est pas valide
        }
        rowIndexW = null;
        break;
      default:
        console.log("Array non reconnu: " + arrayName);
    }
  };

  // Stockage du stock saisi
  const handleInputChange = (arrayName, updatedValue) => {
    switch (arrayName) {
      case "Chavril":
        setTempValueChavril(updatedValue);
        break;
      case "Opel":
        setTempValueOpel(updatedValue);
        break;
      case "Jumpy":
        setTempValueJumpy(updatedValue);
        break;
      case "Partner":
        setTempValuePartner(updatedValue);
        break;
      default:
        console.log("Array non reconnu: " + arrayName);
    }
  };

  const handleSubmit = (e, arrayName) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    switch (arrayName) {
      case "Chavril":
        handleNbChange("Chavril", tempValueChavril);
        setTempValueChavril(""); // Réinitialiser la valeur temporaire
        setSelectedMatChavril("");
        break;
      case "Opel":
        handleNbChange("Opel", tempValueOpel);
        setTempValueOpel(""); // Réinitialiser la valeur temporaire
        setSelectedMatOpel("");
        break;
      case "Jumpy":
        handleNbChange("Jumpy", tempValueJumpy);
        setTempValueJumpy(""); // Réinitialiser la valeur temporaire
        setSelectedMatJumpy("");
        break;
      case "Partner":
        handleNbChange("Partner", tempValuePartner);
        setTempValuePartner(""); // Réinitialiser la valeur temporaire
        setSelectedMatPartner("");
        break;
      default:
        console.log("Array non reconnu: " + arrayName);
    }
  };

  // Prise en compte de la saisie
  const handleNbChange = (arrayName, updatedValue) => {
    console.log("handleNbChange");
    // Mettez à jour array2 avec la nouvelle valeur
    let updatedArray;

    switch (arrayName) {
      case "Chavril":
        updatedArray = [...chavrilArray2];
        if (updatedArray[selectedRowIndexChavril]) {
          updatedArray[selectedRowIndexChavril][2] = updatedValue;
          setChavrilArray2(updatedArray);
        }
        break;
      case "Opel":
        updatedArray = [...opelArray2];
        if (updatedArray[selectedRowIndexOpel]) {
          updatedArray[selectedRowIndexOpel][2] = updatedValue;
          setOpelArray2(updatedArray);
        }
        break;
      case "Jumpy":
        updatedArray = [...jumpyArray2];
        if (updatedArray[selectedRowIndexJumpy]) {
          updatedArray[selectedRowIndexJumpy][2] = updatedValue;
          setJumpyArray2(updatedArray);
        }
        break;
      case "Partner":
        updatedArray = [...partnerArray2];
        if (updatedArray[selectedRowIndexPartner]) {
          updatedArray[selectedRowIndexPartner][2] = updatedValue;
          setPartnerArray2(updatedArray);
        }
        break;
      default:
        console.log("Array non reconnu: " + arrayName);
    }
  };

  useEffect(() => {
    if (fileUrl) {
      readExcelFile(fileUrl);
    }
  }, [fileUrl, readExcelFile]);

  useEffect(() => {
    // Cette fonction sera appelée chaque fois que chavrilArray (ou tout autre état mentionné) est mis à jour.
    // Initialisation des tableaux à MAJ
    handleArray2Init();
  }, [chavrilArray, opelArray, jumpyArray, partnerArray]);

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
              <select onChange={(e) => setSourceType(e.target.value)}>
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
      ((sourceType === "Creation" && fileNameCible) || sourceType === "MAJ") ? (
        <div className="mat-type-bloc">
          <div className="mat-type">
            <h3>*****************************</h3>
            <h3>CHAVRIL</h3>
            <h3>
              {/* Si le tableau est chargé */}
              {chavrilArray.length > 0 ? (
                <div className="choixMat">
                  <select
                    onChange={(e) =>
                      handleSelectMat("Chavril", chavrilArray2, e.target.value)
                    }
                    value={selectedMatChavril}
                  >
                    <option value="">Choisissez le matériel</option>
                    {searchTermChavril
                      ? filterOptions(chavrilArray, searchTermChavril).map(
                          (item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )
                        )
                      : selectOptions(chavrilArray).map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                  </select>
                  <div className="recherche">
                    <label htmlFor="searchInputChavril">Recherche</label>
                    <input
                      id="searchInputChavril"
                      type="text"
                      placeholder="Recherche"
                      onChange={(e) => setSearchTermChavril(e.target.value)}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, "Chavril")}>
                    {chavrilMat && selectedRowIndexChavril != null ? (
                      <div className="nbmaj">
                        <label htmlFor="selectedMatChavril">Nb à MAJ</label>
                        <input
                          id="selectedMatChavril"
                          type="text"
                          value={tempValueChavril}
                          onChange={(e) =>
                            handleInputChange("Chavril", e.target.value)
                          }
                        />{" "}
                        <button type="submit">Mettre à jour</button>
                      </div>
                    ) : null}
                  </form>
                </div>
              ) : sourceName ? (
                <p>Chargement en cours...</p>
              ) : null}
            </h3>
          </div>
          <div className="mat-type">
            <h3>*****************************</h3>
            <h3>OPEL</h3>
            <h3>
              {/* Si le tableau est chargé */}
              {opelArray.length > 0 ? (
                <div className="choixMat">
                  <select
                    onChange={(e) =>
                      handleSelectMat("Opel", opelArray2, e.target.value)
                    }
                    value={selectedMatOpel}
                  >
                    <option value="">Choisissez le matériel</option>
                    {searchTermOpel
                      ? filterOptions(opelArray, searchTermOpel).map(
                          (item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )
                        )
                      : selectOptions(opelArray).map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                  </select>
                  <div className="recherche">
                    <label htmlFor="searchInputOpel">Recherche</label>
                    <input
                      id="searchInputOpel"
                      type="text"
                      placeholder="Recherche"
                      onChange={(e) => setSearchTermOpel(e.target.value)}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, "Opel")}>
                    {opelMat && selectedRowIndexOpel != null ? (
                      <div className="nbmaj">
                        <label htmlFor="selectedMatOpel">Nb à MAJ</label>
                        <input
                          id="selectedMatOpel"
                          type="text"
                          value={tempValueOpel}
                          onChange={(e) =>
                            handleInputChange("Opel", e.target.value)
                          }
                        />{" "}
                        <button type="submit">Mettre à jour</button>
                      </div>
                    ) : null}
                  </form>
                </div>
              ) : sourceName ? (
                <p>Chargement en cours...</p>
              ) : null}
            </h3>
          </div>
          <div className="mat-type">
            <h3>*****************************</h3>
            <h3>JUMPY</h3>
            <h3>
              {/* Si le tableau est chargé */}
              {jumpyArray.length > 0 ? (
                <div className="choixMat">
                  <select
                    onChange={(e) =>
                      handleSelectMat("Jumpy", jumpyArray2, e.target.value)
                    }
                    value={selectedMatJumpy}
                  >
                    <option value="">Choisissez le matériel</option>
                    {searchTermJumpy
                      ? filterOptions(jumpyArray, searchTermJumpy).map(
                          (item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )
                        )
                      : selectOptions(jumpyArray).map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                  </select>
                  <div className="recherche">
                    <label htmlFor="searchInputJumpy">Recherche</label>
                    <input
                      id="searchInputJumpy"
                      type="text"
                      placeholder="Recherche"
                      onChange={(e) => setSearchTermJumpy(e.target.value)}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, "Jumpy")}>
                    {jumpyMat && selectedRowIndexJumpy != null ? (
                      <div className="nbmaj">
                        <label htmlFor="selectedMatJumpy">Nb à MAJ</label>
                        <input
                          id="selectedMatJumpy"
                          type="text"
                          value={tempValueJumpy}
                          onChange={(e) =>
                            handleInputChange("Jumpy", e.target.value)
                          }
                        />{" "}
                        <button type="submit">Mettre à jour</button>
                      </div>
                    ) : null}
                  </form>
                </div>
              ) : sourceName ? (
                <p>Chargement en cours...</p>
              ) : null}
            </h3>
          </div>
          <div className="mat-type">
            <h3>*****************************</h3>
            <h3>PARTNER</h3>
            <h3>
              {/* Si le tableau est chargé */}
              {partnerArray.length > 0 ? (
                <div className="choixMat">
                  <select
                    onChange={(e) =>
                      handleSelectMat("Partner", partnerArray2, e.target.value)
                    }
                    value={selectedMatPartner}
                  >
                    <option value="">Choisissez le matériel</option>
                    {searchTermPartner
                      ? filterOptions(partnerArray, searchTermPartner).map(
                          (item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          )
                        )
                      : selectOptions(partnerArray).map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                  </select>
                  <div className="recherche">
                    <label htmlFor="searchInputPartner">Recherche</label>
                    <input
                      id="searchInputPartner"
                      type="text"
                      placeholder="Recherche"
                      onChange={(e) => setSearchTermPartner(e.target.value)}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, "Partner")}>
                    {partnerMat && selectedRowIndexPartner != null ? (
                      <div className="nbmaj">
                        <label htmlFor="selectedMatPartner">Nb à MAJ</label>
                        <input
                          id="selectedMatPartner"
                          type="text"
                          value={tempValuePartner}
                          onChange={(e) =>
                            handleInputChange("Partner", e.target.value)
                          }
                        />{" "}
                        <button type="submit">Mettre à jour</button>
                      </div>
                    ) : null}
                  </form>
                </div>
              ) : sourceName ? (
                <p>Chargement en cours...</p>
              ) : null}
            </h3>
          </div>
        </div>
      ) : null}
      <div className="generate-doc">
        <GenerateXlsx
          chavrilArray2={chavrilArray2}
          opelArray2={opelArray2}
          jumpyArray2={jumpyArray2}
          partnerArray2={partnerArray2}
          fileNameCible={fileNameCible}
        />
      </div>
    </div>
  );
};

export default UploadSource;
