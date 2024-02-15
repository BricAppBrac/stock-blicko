import { useState } from "react";

const StockChavril = ({ chavrilArray2, setChavrilArray2, sourceName }) => {
  const [searchTermChavril, setSearchTermChavril] = useState("");
  const [chavrilMat, setChavrilMat] = useState(null);

  let rowIndexW = null;
  const [selectedRowIndexChavril, setSelectedRowIndexChavril] = useState(null);

  const [tempValueChavril, setTempValueChavril] = useState("");

  const [selectedMatChavril, setSelectedMatChavril] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [showMessageAjout, setShowMessageAjout] = useState(false);

  let array = chavrilArray2;

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

    // Si l'utilisateur sélectionne "Ajouter un nouveau matériel"
    if (selectedValue === "nouveau") {
      const newMaterial = prompt("Entrez le nom du nouveau matériel :");
      const newQuantity = prompt("Entrez la quantité du nouveau matériel :");
      const newPrice = prompt("Entrez le prix en € du nouveau matériel :");
      const newFournisseur = prompt(
        "Entrez le fournisseur du nouveau matériel :"
      );
      if (newMaterial) {
        const newRow = [
          "",
          newMaterial,
          parseFloat(newQuantity) || 0,
          0,
          parseFloat(newPrice) || 0,
          // (parseFloat(newQuantity) || 0) * (parseFloat(newPrice) || 0),
          "calcul montant par excel",
          newFournisseur || "",
        ];
        setChavrilArray2([...chavrilArray2, newRow]);
        setChavrilMat(newMaterial);
        // setSelectedMatChavril(newMaterial);
        setTempValueChavril(newQuantity);
        ///////////////////////////////
        setShowMessageAjout(true);
        setTimeout(() => {
          setShowMessageAjout(false);
        }, 5000); // 5000 ms = 5 secondes
      }
    } else {
      setChavrilMat(selectedValue);
      setSelectedMatChavril(selectedValue);
      rowIndexW = array.findIndex((row) => row[1] === selectedValue);
      setSelectedRowIndexChavril(rowIndexW);
      // si la ligne est une ligne de stock (length > 2)
      if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
        setTempValueChavril(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
      } else {
        setTempValueChavril(""); // Réinitialiser si l'élément sélectionné n'est pas valide
      }
      rowIndexW = null;
    }
  };

  // Stockage du stock saisi
  const handleInputChange = (updatedValue) => {
    setTempValueChavril(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    handleNbChange(tempValueChavril);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // 5000 ms = 5 secondes
    setTempValueChavril(""); // Réinitialiser la valeur temporaire
    setSelectedMatChavril("");
    setChavrilMat(null);
    setSelectedRowIndexChavril(null);
    setSearchTermChavril("");
  };

  // Prise en compte de la saisie
  const handleNbChange = (updatedValue) => {
    console.log("handleNbChange");
    // Convertir la valeur mise à jour en nombre
    const numericValue = parseFloat(updatedValue) || 0;
    // Mettez à jour array2 avec le nouveau stock (index2)
    let updatedArray;

    updatedArray = [...chavrilArray2];

    if (updatedArray[selectedRowIndexChavril]) {
      updatedArray[selectedRowIndexChavril][2] = numericValue;
      updatedArray[selectedRowIndexChavril][5] = "calcul montant par excel";
      setChavrilArray2(updatedArray);
    }
  };

  return (
    <div className="chavril-content">
      <div className="mat-type">
        <h3>*****************************</h3>
        <h3>CHAVRIL</h3>
        <h3>
          {/* Si le tableau est chargé */}
          {chavrilArray2.length > 0 ? (
            <div className="choixMat">
              <select
                onChange={(e) => handleSelectMat(e.target.value)}
                value={selectedMatChavril}
              >
                <option value="">Choisissez le matériel</option>
                <option value="nouveau">Ajouter un nouveau matériel</option>
                {searchTermChavril
                  ? filterOptions(searchTermChavril).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  : selectOptions(chavrilArray2).map((item, index) => (
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
                  value={searchTermChavril || ""}
                  onChange={(e) => setSearchTermChavril(e.target.value)}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {chavrilMat && selectedRowIndexChavril != null ? (
                  <div className="nbmaj">
                    <label htmlFor="selectedMatChavril">Nb à MAJ</label>
                    <input
                      id="selectedMatChavril"
                      type="text"
                      value={tempValueChavril}
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
          {showMessage && (
            <div className="showmessage">MAJ prise en compte</div>
          )}
          {showMessageAjout && (
            <div className="showmessage">AJOUT pris en compte</div>
          )}
        </h3>
      </div>
    </div>
  );
};

export default StockChavril;
