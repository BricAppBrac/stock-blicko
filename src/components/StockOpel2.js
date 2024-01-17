import { useState } from "react";

const StockOpel2 = ({
  opel2Array2,
  setOpel2Array2,
  opel2Array,
  sourceName,
}) => {
  const [searchTermOpel2, setSearchTermOpel2] = useState("");
  const [opel2Mat, setOpel2Mat] = useState(null);

  let rowIndexW = null;
  const [selectedRowIndexOpel2, setSelectedRowIndexOpel2] = useState(null);

  const [tempValueOpel2, setTempValueOpel2] = useState("");

  const [selectedMatOpel2, setSelectedMatOpel2] = useState("");

  let array = opel2Array2;

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

    setOpel2Mat(selectedValue);
    setSelectedMatOpel2(selectedValue);
    rowIndexW = array.findIndex((row) => row[1] === selectedValue);
    setSelectedRowIndexOpel2(rowIndexW);
    if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
      setTempValueOpel2(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
    } else {
      setTempValueOpel2(""); // Réinitialiser si l'élément sélectionné n'est pas valide
    }
    rowIndexW = null;
  };

  // Stockage du stock saisi
  const handleInputChange = (updatedValue) => {
    setTempValueOpel2(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    handleNbChange(tempValueOpel2);
    setTempValueOpel2(""); // Réinitialiser la valeur temporaire
    setSelectedMatOpel2("");
    setOpel2Mat(null);
    setSelectedRowIndexOpel2(null);
  };

  // Prise en compte de la saisie
  const handleNbChange = (updatedValue) => {
    console.log("handleNbChange");
    // Mettez à jour array2 avec la nouvelle valeur
    let updatedArray;

    updatedArray = [...opel2Array2];
    if (updatedArray[selectedRowIndexOpel2]) {
      updatedArray[selectedRowIndexOpel2][2] = updatedValue;
      setOpel2Array2(updatedArray);
    }
  };

  return (
    <div className="opel2-content">
      <div className="mat-type">
        <h3>*****************************</h3>
        <h3>OPEL2</h3>
        <h3>
          {/* Si le tableau est chargé */}
          {opel2Array.length > 0 ? (
            <div className="choixMat">
              <select
                onChange={(e) => handleSelectMat(e.target.value)}
                value={selectedMatOpel2}
              >
                <option value="">Choisissez le matériel</option>
                {searchTermOpel2
                  ? filterOptions(searchTermOpel2).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  : selectOptions(opel2Array).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
              </select>
              <div className="recherche">
                <label htmlFor="searchInputOpel2">Recherche</label>
                <input
                  id="searchInputOpel2"
                  type="text"
                  placeholder="Recherche"
                  onChange={(e) => setSearchTermOpel2(e.target.value)}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {opel2Mat && selectedRowIndexOpel2 != null ? (
                  <div className="nbmaj">
                    <label htmlFor="selectedMatOpel2">Nb à MAJ</label>
                    <input
                      id="selectedMatOpel2"
                      type="text"
                      value={tempValueOpel2}
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

export default StockOpel2;
