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
  let totauxArrayChavril = null;
  let totauxArrayOpel1 = null;
  let totauxArrayOpel2 = null;
  let totauxArrayJumpy = null;
  let totauxArrayPartner = null;

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

  const ligneVide = ["", "", "", "", "", ""];
  let totalStockFinDeMoisRounded;

  const generateDoc = async () => {
    console.log("generateDoc");
    const totaux = await handleCalculTotauxArray();
    handleGenerateFinalArray(totaux);
  };

  const handleCalculTotauxArray = async () => {
    console.log("handleCalculTotauxArray");

    // Fonction pour calculer le total d'un tableau donné
    const calculTotalParTableau = (tableau) => {
      const total = tableau.reduce((acc, curr) => {
        // Assurez-vous que curr[5] est un nombre. Si ce n'est pas un nombre ou indéfini, ajoutez 0.
        const valeur = Number(curr[5]) || 0;
        return acc + valeur;
      }, 0);
      // Arrondir le résultat sans décimales
      return Math.round(total);
    };

    // Calculer les totaux pour chaque tableau
    totauxArrayChavril = calculTotalParTableau(chavrilArray2);
    totauxArrayOpel1 = calculTotalParTableau(opel1Array2);
    totauxArrayOpel2 = calculTotalParTableau(opel2Array2);
    totauxArrayJumpy = calculTotalParTableau(jumpyArray2);
    totauxArrayPartner = calculTotalParTableau(partnerArray2);

    // Calculer le totalStockFinDeMois
    const totalStockFinDeMois = [
      totauxArrayChavril,
      totauxArrayOpel1,
      totauxArrayOpel2,
      totauxArrayJumpy,
      totauxArrayPartner,
    ].reduce((acc, curr) => acc + curr, 0);

    // Arrondir le totalStockFinDeMois sans décimales
    totalStockFinDeMoisRounded = Math.round(totalStockFinDeMois);

    return {
      totauxArrayChavril,
      totauxArrayOpel1,
      totauxArrayOpel2,
      totauxArrayJumpy,
      totauxArrayPartner,
      totalStockFinDeMois: totalStockFinDeMoisRounded,
    };
  };

  const handleGenerateFinalArray = async (totaux) => {
    // Déconstruction pour obtenir les totaux
    const {
      totauxArrayChavril,
      totauxArrayOpel1,
      totauxArrayOpel2,
      totauxArrayJumpy,
      totauxArrayPartner,
      totalStockFinDeMois,
    } = totaux;

    // Mise à jour des lignes de total avec les valeurs calculées
    const totalChavril = [
      "",
      "",
      "",
      "",
      "",
      totauxArrayChavril,
      "Stock Bureau",
    ];
    const totalOpel1 = ["", "", "", "", "", totauxArrayOpel1, "Stock Opel1"];
    const totalOpel2 = ["", "", "", "", "", totauxArrayOpel2, "Stock Opel2"];
    const totalJumpy = ["", "", "", "", "", totauxArrayJumpy, "Stock Jumpy"];
    const totalPartner = [
      "",
      "",
      "",
      "",
      "",
      totauxArrayPartner,
      "Stock Partner",
    ];
    const totalFinDeMois = [
      "",
      "",
      "",
      "",
      "",
      totalStockFinDeMois,
      "STOCK FIN DE MOIS",
    ];

    // Construction du tableau final
    const finalArray = []
      .concat([enteteChavril], chavrilArray2, [totalChavril], [ligneVide])
      .concat([enteteOpel1], opel1Array2, [totalOpel1], [ligneVide])
      .concat([enteteOpel2], opel2Array2, [totalOpel2], [ligneVide])
      .concat([enteteJumpy], jumpyArray2, [totalJumpy], [ligneVide])
      .concat(
        [entetePartner],
        partnerArray2,
        [totalPartner],
        [ligneVide],
        [ligneVide]
      )
      .concat([totalFinDeMois]);

    console.log("finalArray");
    console.log(finalArray);

    // Génération du fichier xlsx à partir de finalArray, portant le nom fileNameCible passé en props et le sauvegarder dans un répertoire choisi par l'utilisateur

    // Vérification et correction du nom du fichier
    const fileName = fileNameCible.endsWith(".xlsx")
      ? fileNameCible
      : `${fileNameCible}.xlsx`;

    // Conversion de finalArray en feuille de calcul
    const worksheet = XLSX.utils.aoa_to_sheet(finalArray);

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
