import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Document, Page } from "react-pdf";
import pdf from "./cerfa1301SD.pdf";
import { useSelector } from "react-redux";

const XLSExtractor = () => {
  const xlsData = useSelector((state) => state.textSelectedStore.xlsSelections); // Récupération du tableau de données depuis le store

  const [pageNumber] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const handleFileTva = async () => {
    console.log("handleFileTva");

    // Créez une instance de JSZip pour créer le fichier ZIP
    const zip = new JSZip();

    // ************************************** //
    //Préparation du nom de fichier cible avec Numéro de id
    // const numId = "1235";
    // Utilisez cette chaîne pour créer le nom du fichier
    // const fileName = `Attest_TVA_${numId}.pdf`;
    // ************************************** //
    // URL du fichier PDF cerfa
    const urlPdf = pdf;
    const existingPdfBytes = await fetch(urlPdf).then((res) =>
      res.arrayBuffer()
    );

    for (let index = 0; index < xlsData.length; index++) {
      const data = xlsData[index];

      // Créez un nouveau document PDF à chaque itération
      // avec en fond le doc cerfa pour apposer nouvelles données
      // const newPdfDoc = await PDFDocument.create();
      // Créer un document PDF à partir des données existantes

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // **************************
      // Sélectionnez la première page du PDF (index 0)
      const pages = pdfDoc.getPages();
      let firstPage = pages[0];

      // Position (x, y) pour le texte à tamponner

      const addText = (text, x, y) => {
        firstPage.drawText(text, {
          x,
          y,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      };

      // ************************************** //
      //Préparation du nom de fichier cible avec Numéro de id
      const numId = data[0];
      // Utilisez cette chaîne pour créer le nom du fichier
      const fileName = `Attest_TVA_${numId}.pdf`;

      // *** IDENTITE DU CLIENT OU DE SON REPRESENTANT
      // NOM REP (35 mm, 237 mm)
      addText(data[1], 83, 685);
      // ADRESSE REP (39 mm, 234 mm)

      addText(data[2], 93, 673);
      // CODE POSTAL REP (116 mm, 234 mm)
      addText(data[3], 324, 673);
      // COMMUNE REP (142 mm, 234 mm)
      addText(data[4], 404, 673);
      // *** NATURE DES LOCAUX
      // ADRESSE TRAVAUX (39 mm, 190 mm)
      addText(data[5], 93, 539);
      // COMMUNE TRAVAUX (105 mm, 190 mm)
      addText(data[7], 294, 539);
      // CODE POSTAL TRAVAUX (159 mm, 190 mm)
      addText(data[6], 452, 539);

      // *** SIGNATURE
      // LIEU SIGNATURE (96 mm, 64 mm)

      addText(data[4], 265, 164);
      // DATE SIGNATURE (131 mm, 64 mm)
      addText(data[11], 369, 164);

      // **************************************//
      // Case à cocher
      //////
      // Type d'habitat
      addText("x", 385, 622);
      //////
      // Local habitation
      addText("x", 58, 590);
      //////
      // n'affectent 1
      addText("x", 58, 480);
      //////
      // n'affectent 2
      addText("x", 58, 457);
      //////
      // n'entrainent
      addText("x", 58, 408);
      //////
      // ne consistent pas
      addText("x", 58, 398);
      //////
      // Qualité Signataire
      /////
      if (data[8] === "cocher") {
        // pprio
        addText("x", 106, 528);
      } else if (data[9] === "cocher") {
        // locataire
        addText("x", 172, 528);
      } else {
        // autre
        addText("x", 243, 528);
        addText("Gérant", 363, 528);
      }
      //////
      // Générez le fichier PDF modifié
      const modifiedPdfBytes = await pdfDoc.save();

      // Ajoutez le fichier PDF modifié au fichier ZIP
      zip.file(`Attest_TVA_${data[0]}.pdf`, modifiedPdfBytes);

      // const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      //   type: "application/pdf",
      // });

      // saveAs(modifiedPdfBlob, fileName);

      // Une fois que le PDF est prêt, activez le chargement du PDF
      // setPdfLoaded(true);

      // Réinitialisez pdfLoaded à false après la création du document
      // setPdfLoaded(false);
    }
    // Générez le fichier ZIP
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Enregistrez le fichier ZIP avec un nom de fichier
    saveAs(zipBlob, "AttestationsZip.zip");
  };

  return (
    <div className="extract-content">
      <div className="extract-click">
        <h3>*************************************</h3>
        <h3>CREATION DES ATTESTATIONS TVA</h3>
        <h3>*************************************</h3>
        <i className="fa-regular fa-hand-point-right"></i>
        <button onClick={handleFileTva}>
          Création fichier TVA cerfa N°1301-SD_2016
        </button>
      </div>

      {pdfLoaded && (
        <Document file={"./cerfa1301SD.pdf"}>
          <Page pageNumber={pageNumber} width={600} />
        </Document>
      )}
    </div>
  );
};
export default XLSExtractor;
