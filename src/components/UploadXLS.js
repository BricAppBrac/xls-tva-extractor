import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPdfFile } from "../feature/textSelectedSlice";
import { setPdfName } from "../feature/textSelectedSlice";

const UploadPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const pdfName = useSelector((state) => state.textSelectedStore.pdfName);

  // Stocke le fichier sélectionné dans le store
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);

    const fileUrl = URL.createObjectURL(file);
    // dispatch(setPdfFile(fileUrl));
    dispatch(setPdfName(file.name));
  };

  return (
    <div className="upload-content">
      <h3>**********************************</h3>
      <h3>SELECTION DU FICHIER</h3>
      <h3>**********************************</h3>
      {pdfName ? (
        pdfName
      ) : (
        <div className="upload-file">
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          {/* <button onClick={handleUpload}>Télécharger</button> */}
        </div>
      )}
    </div>
  );
};

export default UploadPdf;
