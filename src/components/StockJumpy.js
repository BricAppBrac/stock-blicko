import { useState } from "react";

const StockJumpy = ({ jumpyArray2, setJumpyArray2, sourceName }) => {
  const [searchTermJumpy, setSearchTermJumpy] = useState("");
  const [jumpyMat, setJumpyMat] = useState(null);

  let rowIndexW = null;
  const [selectedRowIndexJumpy, setSelectedRowIndexJumpy] = useState(null);

  const [tempValueJumpy, setTempValueJumpy] = useState("");

  const [selectedMatJumpy, setSelectedMatJumpy] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [showMessageAjout, setShowMessageAjout] = useState(false);

  let array = jumpyArray2;

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
        setJumpyArray2([...jumpyArray2, newRow]);
        setJumpyMat(newMaterial);
        // setSelectedMatJumpy(newMaterial);
        setTempValueJumpy(newQuantity);
        ///////////////////////////////
        setShowMessageAjout(true);
        setTimeout(() => {
          setShowMessageAjout(false);
        }, 5000); // 5000 ms = 5 secondes
      }
    } else {
      setJumpyMat(selectedValue);
      setSelectedMatJumpy(selectedValue);
      rowIndexW = array.findIndex((row) => row[1] === selectedValue);
      setSelectedRowIndexJumpy(rowIndexW);
      if (rowIndexW >= 0 && array[rowIndexW] && array[rowIndexW].length > 2) {
        setTempValueJumpy(array[rowIndexW][2]); // Mettre à jour tempValue avec la valeur de l'index 2
      } else {
        setTempValueJumpy(""); // Réinitialiser si l'élément sélectionné n'est pas valide
      }
      rowIndexW = null;
    }
  };

  // Stockage du stock saisi
  const handleInputChange = (updatedValue) => {
    setTempValueJumpy(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    handleNbChange(tempValueJumpy);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // 5000 ms = 5 secondes
    setTempValueJumpy(""); // Réinitialiser la valeur temporaire
    setSelectedMatJumpy("");
    setJumpyMat(null);
    setSelectedRowIndexJumpy(null);
    setSearchTermJumpy("");
  };

  // Prise en compte de la saisie
  const handleNbChange = (updatedValue) => {
    console.log("handleNbChange");
    // Convertir la valeur mise à jour en nombre
    const numericValue = parseFloat(updatedValue) || 0;
    // Mettez à jour array2 avec le nouveau stock (index2)
    let updatedArray;

    updatedArray = [...jumpyArray2];
    if (updatedArray[selectedRowIndexJumpy]) {
      updatedArray[selectedRowIndexJumpy][2] = numericValue;
      [selectedRowIndexJumpy][5] = "calcul montant par excel";
      setJumpyArray2(updatedArray);
    }
  };

  return (
    <div className="jumpy-content">
      <div className="mat-type">
        <h3>*****************************</h3>
        <h3>JUMPY</h3>
        <h3>
          {/* Si le tableau est chargé */}
          {jumpyArray2.length > 0 ? (
            <div className="choixMat">
              <select
                onChange={(e) => handleSelectMat(e.target.value)}
                value={selectedMatJumpy}
              >
                <option value="">Choisissez le matériel</option>
                <option value="nouveau">Ajouter un nouveau matériel</option>
                {searchTermJumpy
                  ? filterOptions(searchTermJumpy).map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  : selectOptions(jumpyArray2).map((item, index) => (
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
                  value={searchTermJumpy || ""}
                  onChange={(e) => setSearchTermJumpy(e.target.value)}
                />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {jumpyMat && selectedRowIndexJumpy != null ? (
                  <div className="nbmaj">
                    <label htmlFor="selectedMatJumpy">Nb à MAJ</label>
                    <input
                      id="selectedMatJumpy"
                      type="text"
                      value={tempValueJumpy}
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

export default StockJumpy;
