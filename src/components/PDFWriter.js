const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

// Charge un fichier PDF existant
const pdfRead = fs.readFileSync("1301-sd_1515.pdf");

// Crée un nouveau document PDF
const pdfDoc = await PDFDocument.load(pdfRead);
const page = pdfDoc.getPage(0); // page 0

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

// Position (x, y) pour le texte
const x = 100; // Coordonnée horizontale en points
const y = 500; // Coordonnée verticale en points

// Texte que vous souhaitez ajouter

// const texteNomSelected = useSelector(
//   (state) => state.textSelectedStore.texteNom
// );
const texteNomSelected = "REGIE ESSAI";

// Définir la taille de la police et la couleur du texte
const fontSize = 12;
const fontColor = rgb(0, 0, 0); // Noir

// Obtenez une police standard
const helveticaFont = await pdfDoc.embedFont(
  PDFDocument.StandardFonts.Helvetica
);

// Ajoutez le texte à la page PDF
page.drawText(texteNomSelected, {
  x,
  y,
  size: fontSize,
  font: helveticaFont,
  color: fontColor,
});

// Sérialisez le document PDF modifié
const modifiedPdf = await pdfDoc.save();

// Enregistrez le PDF modifié dans un fichier
fs.writeFileSync(fileName, modifiedPdf);
