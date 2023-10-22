import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";

const XLSExtractor = () => {
  // const nomRepresentant = useSelector(
  //   (state) => state.textSelectedStore.texteNom
  // );
  const [nomRepresentant, setNomRepresentant] = useState("REGIE ESSAI");
  const [adresseRepresentant, setAdresseRepresentant] = useState(
    "Adresse Représentant ESSAI"
  );
  const [cpRep, setCpRep] = useState("69XXX");
  const [communeRep, setCommuneRep] = useState("LYONouPAS");
  const [adresseTravaux, setAdresseTravaux] = useState("Adresse Travaux ESSAI");
  const [cpTravaux, setCpTravaux] = useState("69YYY");
  const [communeTravaux, setCommuneTravaux] = useState("LYONpossibly");
  const [qualiteSignataire, setQualiteSignataire] = useState("L");
  const [lieuSignature, setLieuSignature] = useState("DIEUSAITOU");
  const [dateSignature, setDateSignature] = useState("21/02/2023");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileTva = async () => {
    console.log("handleFileTva");

    // Crée un nouveau document PDF
    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // const page = pdfDoc.getPage(0); // page 0

    //Préparation du nom de fichier avec date
    const currentDate = new Date();

    // Obtenez les composantes de la date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    // Créez une chaîne de date au format "YYYY-MM-DD_HH-MM-SS"
    const dateStr = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    // Utilisez cette chaîne pour créer le nom du fichier
    const fileName = `1301-SD_${dateStr}.pdf`;

    // Position (x, y) pour le texte à tamponner
    const x = 0; // Coordonnée horizontale en points
    const y = 0; // Coordonnée verticale en points

    // Texte que vous souhaitez ajouter

    // const texteNomSelected = useSelector(
    //   (state) => state.textSelectedStore.texteNom
    // );
    const texteNomSelected = "REGIE ESSAI";

    // Définir la taille de la police et la couleur du texte
    const fontSize = 20;
    const fontColor = rgb(0, 0, 0); // Noir

    // Obtenez une police standard
    const helveticaFont = await pdfDoc.embedFont(
      PDFDocument.StandardFonts.Helvetica
    );

    // Ajoutez le texte à la page PDF
    const addText = (text, x, y) => {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font: helveticaFont,
        color: fontColor,
      });
      y -= 20; // Décalez le texte vers le haut
    };

    addText(texteNomSelected, 100, 500);

    // Sérialisez le document PDF modifié
    const modifiedPdf = await pdfDoc.save();

    // Créez un objet Blob à partir du contenu
    // Utilisez FileSaver.js pour télécharger le fichier PDF
    const blob = new Blob([modifiedPdf], { type: "application/pdf" });
    // Enregistrez le PDF modifié dans un fichier
    // Utilisez FileSaver.js pour télécharger le fichier
    saveAs(blob, fileName);
    // // Clear
    // dispatch(clearTextSelections());
  };

  return (
    <div className="extract-content">
      <div className="extract-click">
        <i className="fa-regular fa-hand-point-right"></i>
        <button onClick={handleFileTva}>
          Création fichier TVA cerfa N°1301-SD_2016
        </button>
      </div>
      <h3>***</h3>
      <h3>Identité du client ou de son représentant</h3>
      <h3>***</h3>
      <h4>NOM colonne B du fichier excel</h4>
      {texteNomSelected}
      <h4>ADRESSE colonne C</h4>
      {adresseRepresentant}
      <h4>CODE POSTAL colonne D</h4>
      {cpRep}
      <h4>COMMUNE colonne E</h4>
      {communeRep}
      <h3>***</h3>
      <h3>Nature des locaux</h3>
      <h3>***</h3>

      <h4>ADRESSE TRAVAUX colonne F</h4>
      {adresseTravaux}
      <h4>CODE POSTAL colonne G</h4>
      {cpTravaux}
      <h4>COMMUNE colonne H</h4>
      {communeTravaux}
      <h4>QUALITE signataire colonne K, L ou M</h4>
      {qualiteSignataire}
      <h3>***</h3>
      <h3>Signature</h3>
      <h3>***</h3>
      <h4>LIEU colonne E</h4>
      {lieuSignature}
      <h4>DATE colonne J</h4>
      {dateSignature}
    </div>
  );
};
export default XLSExtractor;
