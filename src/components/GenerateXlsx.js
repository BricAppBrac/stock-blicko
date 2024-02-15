import React from "react";
import * as XLSX from "xlsx";

const GenerateXlsx = ({
  chavrilArray2,
  opel1Array2,
  opel2Array2,
  jumpyArray2,
  partnerArray2,
  fileNameCible,
}) => {
  let currArray = "";

  const enteteChavril = [
    "",
    "Chavril",
    "Quantité M",
    "Quantité M-1",
    "Prix Unitaire €",
    "Montant €",
    "Fournisseur",
  ];
  const enteteOpel1 = [
    "",
    "Opel1",
    "Quantité M",
    "Quantité M-1",
    "Prix Unitaire €",
    "Montant €",
    "Fournisseur",
  ];
  const enteteOpel2 = [
    "",
    "Opel2",
    "Quantité M",
    "Quantité M-1",
    "Prix Unitaire €",
    "Montant €",
    "Fournisseur",
  ];
  const enteteJumpy = [
    "",
    "Jumpy",
    "Quantité M",
    "Quantité M-1",
    "Prix Unitaire €",
    "Montant €",
    "Fournisseur",
  ];
  const entetePartner = [
    "",
    "Partner",
    "Quantité M",
    "Quantité M-1",
    "Prix Unitaire €",
    "Montant €",
    "Fournisseur",
  ];

  const ligneVide = ["", "", "", "", "", "", ""];

  const generateDoc = async () => {
    console.log("generateDoc");
    handleGenerateFinalArray();
  };

  const handleGenerateFinalArray = async () => {
    console.log("handleGenerateFinalArray");
    let totauxArrayChavril,
      totauxArrayOpel1,
      totauxArrayOpel2,
      totauxArrayJumpy,
      totauxArrayPartner,
      totalStockFinDeMois;

    // Mise à jour des lignes de total avec les résultats des formules
    const ligneTotalChavril = ["", "", "", "", "", "", "Stock Bureau"];
    const ligneTotalOpel1 = ["", "", "", "", "", "", "Stock Opel1"];
    const ligneTotalOpel2 = ["", "", "", "", "", "", "Stock Opel2"];
    const ligneTotalJumpy = ["", "", "", "", "", "", "Stock Jumpy"];
    const ligneTotalPartner = ["", "", "", "", "", "", "Stock Partner"];
    const ligneTotalFinDeMois = ["", "", "", "", "", "", "STOCK FIN DE MOIS"];

    // Initialisation du tableau final
    const finalArray = []
      .concat([enteteChavril], chavrilArray2, [ligneTotalChavril], [ligneVide])
      .concat([enteteOpel1], opel1Array2, [ligneTotalOpel1], [ligneVide])
      .concat([enteteOpel2], opel2Array2, [ligneTotalOpel2], [ligneVide])
      .concat([enteteJumpy], jumpyArray2, [ligneTotalJumpy], [ligneVide])
      .concat(
        [entetePartner],
        partnerArray2,
        [ligneTotalPartner],
        [ligneVide],
        [ligneVide],
        [ligneTotalFinDeMois]
      );
    // .concat([ligneTotalFinDeMois]);

    // Ajout de la formule Excel dans la colonne "Montant €" (colonne 5) pour chaque ligne du tableau
    console.log("Boucle de calcul des montants");
    finalArray.forEach((row, rowIndex) => {
      if (row[1] === "Chavril") {
        console.log("Chavril");
        currArray = "Chavril";
      } else if (row[1] === "Opel1") {
        console.log("Opel1");
        currArray = "Opel1";
      } else if (row[1] === "Opel2") {
        console.log("Opel2");
        currArray = "Opel2";
      } else if (row[1] === "Jumpy") {
        console.log("Jumpy");
        currArray = "Jumpy";
      } else if (row[1] === "Partner") {
        console.log("Partner");
        currArray = "Partner";
      }

      if (
        rowIndex > 0 &&
        rowIndex < finalArray.length - 1 &&
        row[1] &&
        row[5] !== "Montant €"
      ) {
        row[5] = {
          f: `C${rowIndex + 1} * E${rowIndex + 1}`, // Formule Excel
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard}; // Formule Excel
        };
      }
      // ligneTotalChavril
      if (currArray === "Chavril" && rowIndex === chavrilArray2.length + 2) {
        console.log("calcul du total pour Chavril");
        row[5] = {
          f: `SUM(F2:F${rowIndex - 1})`, // Formule Excel pour la somme de la colonne "Montant €"
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totauxArrayChavril = row[5];
        ligneTotalChavril[5] = row[5];
        console.log("totauxArrayChavril");
        console.log(totauxArrayChavril);
      }
      // ligneTotalOpel1
      if (
        currArray === "Opel1" &&
        rowIndex === chavrilArray2.length + opel1Array2.length + 5
      ) {
        console.log("calcul du total pour Opel1");
        row[5] = {
          f: `SUM(F${rowIndex - opel1Array2.length}:F${rowIndex - 1})`, // Formule Excel pour la somme de la colonne "Montant €"
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totauxArrayOpel1 = row[5];
        ligneTotalOpel1[5] = row[5];
        console.log("totauxArrayOpel1");
        console.log(totauxArrayOpel1);
      }
      // ligneTotalOpel2
      if (
        currArray === "Opel2" &&
        rowIndex ===
          chavrilArray2.length + opel1Array2.length + opel2Array2.length + 8
      ) {
        console.log("calcul du total pour Opel2");
        row[5] = {
          f: `SUM(F${rowIndex - opel2Array2.length}:F${rowIndex - 1})`, // Formule Excel pour la somme de la colonne "Montant €"
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totauxArrayOpel2 = row[5];
        ligneTotalOpel2[5] = row[5];
        console.log("totauxArrayOpel2");
        console.log(totauxArrayOpel2);
      }
      // ligneTotalJumpy
      if (
        currArray === "Jumpy" &&
        rowIndex ===
          chavrilArray2.length +
            opel1Array2.length +
            opel2Array2.length +
            jumpyArray2.length +
            11
      ) {
        console.log("calcul du total pour Jumpy");
        row[5] = {
          f: `SUM(F${rowIndex - jumpyArray2.length}:F${rowIndex - 1})`, // Formule Excel pour la somme de la colonne "Montant €"
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totauxArrayJumpy = row[5];
        ligneTotalJumpy[5] = row[5];
        console.log("totauxArrayJumpy");
        console.log(totauxArrayJumpy);
      }
      // ligneTotalPartner
      if (
        currArray === "Partner" &&
        rowIndex ===
          chavrilArray2.length +
            opel1Array2.length +
            opel2Array2.length +
            jumpyArray2.length +
            partnerArray2.length +
            14
      ) {
        console.log("calcul du total pour Partner");
        row[5] = {
          f: `SUM(F${rowIndex - partnerArray2.length}:F${rowIndex - 1})`, // Formule Excel pour la somme de la colonne "Montant €"
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totauxArrayPartner = row[5];
        ligneTotalPartner[5] = row[5];
        console.log("totauxArrayPartner");
        console.log(totauxArrayPartner);
      }
      console.log("***********Avant traitement Fin de Mois");
      // ligneTotalFinDeMois
      if (rowIndex === finalArray.length - 1) {
        console.log("calcul du Total Fin De Mois");
        row[5] = {
          f: `SUM(F${chavrilArray2.length + 2},F${
            chavrilArray2.length + opel1Array2.length + 5
          },F${
            chavrilArray2.length + opel1Array2.length + opel2Array2.length + 8
          },F${
            chavrilArray2.length +
            opel1Array2.length +
            opel2Array2.length +
            jumpyArray2.length +
            11
          },F${
            chavrilArray2.length +
            opel1Array2.length +
            opel2Array2.length +
            jumpyArray2.length +
            partnerArray2.length +
            14
          })`, // Formule Excel pour la somme des totaux
          t: "n", // Définir le type de cellule sur 'n' (nombre)
          z: XLSX.SSF.get_table()[0], // Appliquer le format de nombre standard
        };
        totalStockFinDeMois = row[5];
        ligneTotalFinDeMois[5] = row[5];
        console.log("totalStockFinDeMois ");
        console.log(totalStockFinDeMois);
      }
      ligneVide[5] = "";
    });

    // Construction du tableau final
    const updatedFinalArray = []
      .concat([enteteChavril], chavrilArray2, [ligneTotalChavril], [ligneVide])
      .concat([enteteOpel1], opel1Array2, [ligneTotalOpel1], [ligneVide])
      .concat([enteteOpel2], opel2Array2, [ligneTotalOpel2], [ligneVide])
      .concat([enteteJumpy], jumpyArray2, [ligneTotalJumpy], [ligneVide])
      .concat(
        [entetePartner],
        partnerArray2,
        [ligneTotalPartner],
        [ligneVide],
        [ligneVide],
        [ligneTotalFinDeMois]
      );
    // .concat([ligneTotalFinDeMois]);

    console.log("updatedFinalArray");
    console.log(updatedFinalArray);

    // Génération du fichier xlsx à partir de finalArray, portant le nom fileNameCible passé en props et le sauvegarder dans un répertoire choisi par l'utilisateur

    // Vérification et correction du nom du fichier
    const fileName = fileNameCible.endsWith(".xlsx")
      ? fileNameCible
      : `${fileNameCible}.xlsx`;

    // Conversion de finalArray en feuille de calcul
    const worksheet = XLSX.utils.aoa_to_sheet(updatedFinalArray);

    // Parcourir toutes les cellules du worksheet et ajuster le format pour les cellules numériques
    for (let cell in worksheet) {
      // vérifier si c'est une cellule (et non une propriété de l'objet worksheet)
      if (cell[0] === "!") continue;

      // Définir le type et le format de cellule pour les nombres
      if (typeof worksheet[cell].v === "number") {
        worksheet[cell].t = "n"; // Définir le type de cellule sur 'n' (nombre)
        worksheet[cell].z = XLSX.SSF.get_table()[0]; // Appliquer le format de nombre standard
      }
    }

    // Création d'un nouveau classeur et ajout de la feuille de calcul
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileNameCible);
    console.log("----------  GENERATION XLXS  ---------");
    console.log("fileNameCible");
    console.log(fileNameCible);
    // Exportation du classeur en tant que fichier XLSX

    XLSX.writeFile(workbook, fileName);

    console.log(`Le fichier ${fileName} a été généré avec succès.`);
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
