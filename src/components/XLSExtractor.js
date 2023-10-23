import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Document, Page } from "react-pdf";
import pdf from "./cerfa1301SD.pdf";
import { useSelector } from "react-redux";

const XLSExtractor = () => {
  const xlsData = useSelector((state) => state.textSelectedStore.xlsSelections); // Récupération du tableau de données depuis le store

  const [pageNumber] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const handleFileTva = async () => {
    console.log("handleFileTva");

    // ************************************** //
    // URL du fichier PDF cerfa
    const urlPdf = pdf;
    const existingPdfBytes = await fetch(urlPdf).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let firstPage = null;

    // Position (x, y) pour le texte à tamponner
    const addText = (text, x, y) => {
      firstPage.drawText(text.toString(), {
        x,
        y,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    };

    try {
      xlsData.forEach((rowData, index) => {
        // Créer un document PDF avec en fond le doc cerfa pour apposer nouvelles données

        // ************************************** //
        //Préparation du nom de fichier cible avec Numéro de id
        const numId = rowData[0];
        // Utilisez cette chaîne pour créer le nom du fichier
        const fileName = `Attest_TVA_${numId}.pdf`;

        // **************************
        // Sélectionnez la première page du PDF (index 0)
        const pages = pdfDoc.getPages();
        firstPage = pages[0];
        const secondPage = pages[1];
        const thirdPage = pages[2];
        // const { width, height } = firstPage.getSize();

        // *** IDENTITE DU CLIENT OU DE SON REPRESENTANT
        // NOM REP (35 mm, 237 mm)
        // addText(rowData[1].toString(), 83, 685);
        // // ADRESSE REP (39 mm, 234 mm)
        // addText(rowData[2].toString(), 93, 673);
        // // CODE POSTAL REP (116 mm, 234 mm)
        // addText(rowData[3], 324, 673);
        // // COMMUNE REP (142 mm, 234 mm)
        // addText(rowData[4].toString(), 404, 673);
        // // *** NATURE DES LOCAUX
        // // ADRESSE TRAVAUX (39 mm, 190 mm)
        // addText(rowData[5].toString(), 93, 539);
        // // CODE POSTAL TRAVAUX (159 mm, 190 mm)
        // addText(rowData[6], 452, 539);
        // // COMMUNE TRAVAUX (105 mm, 190 mm)
        // addText(rowData[7].toString(), 294, 539);

        // // *** SIGNATURE
        // // LIEU SIGNATURE (96 mm, 64 mm)
        // addText(rowData[4].toString(), 265, 164);
        // // DATE SIGNATURE (131 mm, 64 mm)
        // addText(rowData[11].toString(), 369, 164);
        // // **************************************//
        // // Case à cocher
        // //////
        // // Type d'habitat
        // addText("x", 385, 622);
        // //////
        // // Local habitation
        // addText("x", 58, 590);
        // //////
        // // n'affectent 1
        // addText("x", 58, 480);
        // //////
        // // n'affectent 2
        // addText("x", 58, 457);
        // //////
        // // n'entrainent
        // addText("x", 58, 408);
        // //////
        // // ne consistent pas
        // addText("x", 58, 398);
        // //////
        // // Qualité Signataire
        // /////
        // if (rowData[8].toString() === "cocher") {
        //   // pprio
        //   addText("x", 106, 528);
        // } else if (rowData[9].toString() === "cocher") {
        //   // locataire
        //   addText("x", 172, 528);
        // } else {
        //   // autre
        //   addText("x", 243, 528);
        //   addText("Gérant", 363, 528);
        // }
        //////
        const modifiedPdfBytes = pdfDoc.save();
        const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
          type: "application/pdf",
        });

        // Créez une URL pour le Blob
        const url = URL.createObjectURL(modifiedPdfBlob);

        // Créez un lien de téléchargement et définissez l'URL
        const downloadLink = document.createElement("a");
        downloadLink.href = url;

        // Définissez le nom du fichier téléchargé
        downloadLink.download = fileName;

        // Une fois que le PDF est prêt, activez le chargement du PDF
        setPdfLoaded(true);

        // Cliquez sur le lien pour déclencher le téléchargement
        downloadLink.click();

        // Libérez la mémoire en révoquant l'URL
        URL.revokeObjectURL(url);
        // Réinitialisez pdfLoaded à false après la création du document
        setPdfLoaded(false);
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du traitement du PDF :",
        error
      );
    }
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
