import { useState } from "react";

const StockPartner = ({
  partnerArray2,
  setPartnerArray2,
  partnerArray,
  sourceName,
}) => {
  const [searchTermPartner, setSearchTermPartner] = useState("");
  const [partnerMat, setPartnerMat] = useState(null);

  let rowIndexW = null;
  const [selectedRowIndexPartner, setSelectedRowIndexPartner] = useState(null);

  const [tempValuePartner, setTempValuePartner] = useState("");

  const [selectedMatPartner, setSelectedMatPartner] = useState("");

  let array = partnerArray2;

  // Fonction pour filtrer les options basées sur la saisie de l'utilisateur
  const filterOptions = (searchTerm) => {
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
  const selectOptions = (arraySource) => {
    console.log("selectOptions");
    return arraySource.map((item) => item[1]); // Retourne les valeurs de l'index 1
  };

  // Fonction pour afficher le nombre à modifier après sélection du matériel
  const handleSelectMat = (selectedValue) => {
    console.log("handleSelectMat");

    setPartnerMat(selectedValue);
    setSelectedMatPartner(selectedValue);
    rowIndexW = array.findIndex((row) => row[1] === selectedValue);
    setSelectedRowIndexPartner(rowIndexW);
    if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
      setTempValuePartner(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
    } else {
      setTempValuePartner(""); // Réinitialiser si l'élément sélectionné n'est pas valide
    }
    rowIndexW = null;
  };

  // Stockage du stock saisi
  const handleInputChange = (updatedValue) => {
    setTempValuePartner(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    handleNbChange(tempValuePartner);
    setTempValuePartner(""); // Réinitialiser la valeur temporaire
    setSelectedMatPartner("");
    setPartnerMat(null);
    setSelectedRowIndexPartner(null);
    setSearchTermPartner("");
  };

  // Prise en compte de la saisie
  const handleNbChange = (updatedValue) => {
    console.log("handleNbChange");
    // Mettez à jour array2 avec la nouvelle valeur
    let updatedArray;

    updatedArray = [...partnerArray2];
    if (updatedArray[selectedRowIndexPartner]) {
      updatedArray[selectedRowIndexPartner][2] = updatedValue;
      setPartnerArray2(updatedArray);
    }
  };

  return (
    <div className="partner-content">
      <div className="mat-type">
        <h3>*****************************</h3>
        <h3>PARTNER</h3>
        <h3>
          {/* Si le tableau est chargé */}
          {partnerArray.length > 0 ? (
            <div className="choixMat">
              <select
                onChange={(e) => handleSelectMat(e.target.value)}
                value={selectedMatPartner}
              >
                <option value="">Choisissez le matériel</option>
                {searchTermPartner
                  ? filterOptions(searchTermPartner).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
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
                  value={searchTermPartner || ""}
                  onChange={(e) => setSearchTermPartner(e.target.value)}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {partnerMat && selectedRowIndexPartner != null ? (
                  <div className="nbmaj">
                    <label htmlFor="selectedMatPartner">Nb à MAJ</label>
                    <input
                      id="selectedMatPartner"
                      type="text"
                      value={tempValuePartner}
                      onChange={(e) => handleInputChange(e.target.value)}
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
  );
};

export default StockPartner;
