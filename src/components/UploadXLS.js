import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setXlsName, addXlsSelection } from "../feature/textSelectedSlice";
import * as XLSX from "xlsx";
import * as xls from "xlsjs";

const UploadXLS = () => {
  const [selectedFileXls, setSelectedFileXls] = useState(null);
  const dispatch = useDispatch();

  const xlsName = useSelector((state) => state.textSelectedStore.xlsName);

  // ******************************** //
  // Formatage date
  //************/
  function convertExcelDateToDateString(excelDate) {
    // Convertir le nombre en millisecondes
    const excelTime = (excelDate - 25569) * 86400 * 1000;

    // Créer un objet Date
    const date = new Date(excelTime);

    // Formater la date
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  }

  // ********************************************//
  // Stocke le fichier sélectionné dans le store
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFileXls(file);

    // const fileUrl = URL.createObjectURL(file);
    dispatch(setXlsName(file.name));
    if (file) {
      // Appel de la fonction pour traiter le fichier Excel
      handleExcelFile(file);
    }
  };
  // *********************************************//
  // Fonction pour gérer le fichier Excel chargé
  // Récupération des données excel à stocker dans un tableau provisoire
  const handleExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;

      let workbook;

      // Déterminez l'extension du fichier
      if (file.name.endsWith(".xls")) {
        // Fichier au format .xls
        workbook = xls.read(data, { type: "binary" });
        console.log("workbook xls");
        console.log(workbook);
      } else if (file.name.endsWith(".xlsx")) {
        // Fichier au format .xlsx
        workbook = XLSX.read(data, { type: "array" });
        console.log("workbook xlsx");
        console.log(workbook);
      } else {
        console.error("Format de fichier non pris en charge.");
        return;
      }

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log("excelData");
      console.log(excelData);
      // Traitement des données Excel et génération d'un tableau
      const tableData = [];

      // Boucle à partir de la deuxième ligne pour ignorer l'en-tête
      for (let i = 1; i < excelData.length && i < 9000; i++) {
        const row = excelData[i];
        if (row.length >= 11) {
          // Extraction des données des colonnes spécifiques
          const rowData = [
            row[0].toString(), // Colonne A
            row[1].toString(), // Colonne B
            row[2].toString(), // Colonne C
            row[3].toString(), // Colonne D
            row[4].toString(), // Colonne E
            row[5].toString(), // Colonne F
            row[6].toString(), // Colonne G
            row[7].toString(), // Colonne H
            row[10].toString(), // Colonne K
            row[11].toString(), // Colonne L
            row[12].toString(), // Colonne M
            convertExcelDateToDateString(row[9]), // Colonne J
          ];
          // Ajout de la ligne de données au tableau
          tableData.push(rowData);
          dispatch(addXlsSelection(rowData));
        }
        if (i === 9000) {
          console.log("boucle i infinie");
        }
      }
      console.log("tableData");
      console.log(tableData);
      // Maintenant, vous avez les données extraites sous forme de tableau
    };

    // chargement du fichier en tant qu'array buffer est une opération commune pour les deux formats de fichier Excel.
    // Cela permet d'obtenir une représentation binaire du contenu du fichier, sur laquelle vous pouvez ensuite effectuer des opérations de lecture, d'analyse et d'extraction de données en utilisant des bibliothèques adaptées au format du fichier.
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="upload-content">
      <h3>*************************************</h3>
      <h3>SELECTION DU FICHIER SOURCE .XLS</h3>
      <h3>*************************************</h3>
      {xlsName ? (
        xlsName
      ) : (
        <div className="upload-file">
          <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default UploadXLS;
