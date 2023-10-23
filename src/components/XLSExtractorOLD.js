import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Document, Page } from "react-pdf";
import pdf from "./cerfa1301SD.pdf";
import { useSelector } from "react-redux";

const XLSExtractor = () => {
  const xlsData = useSelector((state) => state.textSelectedStore.xlsSelections); // Récupération du tableau de données depuis le store

  const [nomRepresentant] = useState("REGIE ESSAI");
  const [adresseRepresentant] = useState("Adresse Représentant ESSAI");
  const [cpRep] = useState("69XXX");
  const [communeRep] = useState("LYONouPAS");
  const [adresseTravaux] = useState("Adresse Travaux ESSAI");
  const [cpTravaux] = useState("69YYY");
  const [communeTravaux] = useState("LYONpossibly");
  const [qualiteSignataire] = useState("A");
  const [lieuSignature] = useState("DIEUSAITOU");
  const [dateSignature] = useState("21/02/2023");

  const [pageNumber] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const handleFileTva = async () => {
    console.log("handleFileTva");

    // ************************************** //
    //Préparation du nom de fichier cible avec Numéro de id
    const numId = "1235";
    // Utilisez cette chaîne pour créer le nom du fichier
    const fileName = `Attest_TVA_${numId}.pdf`;
    // ************************************** //
    // URL du fichier PDF cerfa
    const urlPdf = pdf;
    const existingPdfBytes = await fetch(urlPdf).then((res) =>
      res.arrayBuffer()
    );

    try {
      // Créer un document PDF à partir des données existantes

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Sélectionnez la première page du PDF (index 0)
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const secondPage = pages[1];
      const thirdPage = pages[2];
      // const { width, height } = firstPage.getSize();

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

      // *** IDENTITE DU CLIENT OU DE SON REPRESENTANT
      // NOM REP (35 mm, 237 mm)
      addText(nomRepresentant, 83, 685);
      // ADRESSE REP (39 mm, 234 mm)
      addText(adresseRepresentant, 93, 673);
      // CODE POSTAL REP (116 mm, 234 mm)
      addText(cpRep, 324, 673);
      // COMMUNE REP (142 mm, 234 mm)
      addText(communeRep, 404, 673);
      // *** NATURE DES LOCAUX
      // ADRESSE TRAVAUX (39 mm, 190 mm)
      addText(adresseTravaux, 93, 539);
      // COMMUNE TRAVAUX (105 mm, 190 mm)
      addText(communeTravaux, 294, 539);
      // CODE POSTAL TRAVAUX (159 mm, 190 mm)
      addText(cpTravaux, 452, 539);
      // QUALITE SIGNATAIRE (39 mm, 234 mm)
      // addText(qualiteSignataire, 93, 676);
      // *** SIGNATURE
      // LIEU SIGNATURE (96 mm, 64 mm)
      addText(lieuSignature, 265, 164);
      // DATE SIGNATURE (131 mm, 64 mm)
      addText(dateSignature, 369, 164);
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
      if (qualiteSignataire === "P") {
        // pprio
        addText("x", 106, 528);
      } else if (qualiteSignataire === "L") {
        // locataire
        addText("x", 172, 528);
      } else {
        // autre
        addText("x", 243, 528);
        addText("Gérant", 363, 528);
      }
      //////
      const modifiedPdfBytes = await pdfDoc.save();
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
