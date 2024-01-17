import { useState } from "react";

const StockOpel1 = ({
  opel1Array2,
  setOpel1Array2,
  opel1Array,
  sourceName,
}) => {
  const [searchTermOpel1, setSearchTermOpel1] = useState("");
  const [opel1Mat, setOpel1Mat] = useState(null);

  let rowIndexW = null;
  const [selectedRowIndexOpel1, setSelectedRowIndexOpel1] = useState(null);

  const [tempValueOpel1, setTempValueOpel1] = useState("");

  const [selectedMatOpel1, setSelectedMatOpel1] = useState("");

  let array = opel1Array2;

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

    setOpel1Mat(selectedValue);
    setSelectedMatOpel1(selectedValue);
    rowIndexW = array.findIndex((row) => row[1] === selectedValue);
    setSelectedRowIndexOpel1(rowIndexW);
    if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
      setTempValueOpel1(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
    } else {
      setTempValueOpel1(""); // Réinitialiser si l'élément sélectionné n'est pas valide
    }
    rowIndexW = null;
  };

  // Stockage du stock saisi
  const handleInputChange = (updatedValue) => {
    setTempValueOpel1(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    handleNbChange(tempValueOpel1);
    setTempValueOpel1(""); // Réinitialiser la valeur temporaire
    setSelectedMatOpel1("");
    setOpel1Mat(null);
    setSelectedRowIndexOpel1(null);
    setSearchTermOpel1("");
  };

  // Prise en compte de la saisie
  const handleNbChange = (updatedValue) => {
    console.log("handleNbChange");
    // Mettez à jour array2 avec la nouvelle valeur
    let updatedArray;

    updatedArray = [...opel1Array2];
    if (updatedArray[selectedRowIndexOpel1]) {
      updatedArray[selectedRowIndexOpel1][2] = updatedValue;
      setOpel1Array2(updatedArray);
    }
  };

  return (
    <div className="opel1-content">
      <div className="mat-type">
        <h3>*****************************</h3>
        <h3>OPEL1</h3>
        <h3>
          {/* Si le tableau est chargé */}
          {opel1Array.length > 0 ? (
            <div className="choixMat">
              <select
                onChange={(e) => handleSelectMat(e.target.value)}
                value={selectedMatOpel1}
              >
                <option value="">Choisissez le matériel</option>
                {searchTermOpel1
                  ? filterOptions(searchTermOpel1).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  : selectOptions(opel1Array).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
              </select>
              <div className="recherche">
                <label htmlFor="searchInputOpel1">Recherche</label>
                <input
                  id="searchInputOpel1"
                  type="text"
                  placeholder="Recherche"
                  value={searchTermOpel1 || ""}
                  onChange={(e) => setSearchTermOpel1(e.target.value)}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {opel1Mat && selectedRowIndexOpel1 != null ? (
                  <div className="nbmaj">
                    <label htmlFor="selectedMatOpel1">Nb à MAJ</label>
                    <input
                      id="selectedMatOpel1"
                      type="text"
                      value={tempValueOpel1}
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

export default StockOpel1;
