import React, { useState, useEffect } from "react";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import { useDispatch } from "react-redux";
import { setMessageInfo } from "../feature/messageInfoSlice";
import {
  setPdfType,
  addTexteComplet,
  clearTexteComplet,
} from "../feature/textSelectedSlice";

const PDFViewer = ({ pdfUrl }) => {
  const [pageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);
  const [textContent, setTextContent] = useState("");

  const dispatch = useDispatch();

  const handleTypeFichier = (typeSelected) => {
    dispatch(setPdfType(typeSelected));
    dispatch(
      setMessageInfo("Cliquer sur le bouton pour générer un fichier .txt")
    );
  };

  useEffect(() => {
    dispatch(setMessageInfo("Sélectionner le type de fichier choisi"));
    const loadPdf = async () => {
      try {
        // Lecture du PDF
        const loadingTask = getDocument({ url: pdfUrl });

        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);

        // Récupération du texte de la page actuelle (pageNumber)
        const page = await pdfDoc.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        setTextContent(text);
        dispatch(addTexteComplet(text));
      } catch (error) {
        dispatch(clearTexteComplet());
        console.error("Erreur lors du chargement du PDF : ", error);
      }
    };

    loadPdf();
  }, [pdfUrl, pageNumber, dispatch]);

  return (
    <div>
      {/* <div>Page {pageNumber}</div> */}
      <div className="div">
        <h3>**********************************</h3>
        <h3>TYPE DU FICHIER CHOISI</h3>
        <h3>**********************************</h3>
        <select
          name="typefichier"
          id="typefichier"
          onChange={(e) => {
            handleTypeFichier(e.target.value);
          }}
        >
          {" "}
          <option value="">Sélectionner type</option>
          <option value="Citya">Citya</option>
          <option value="Oralia">Oralia</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <h3>Texte brut complet:</h3>
      <h5>{textContent}</h5>
      {/* <button onClick={() => setPageNumber(pageNumber - 1)}>
        Page précédente
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>
        Page suivante
      </button> */}
    </div>
  );
};

export default PDFViewer;
