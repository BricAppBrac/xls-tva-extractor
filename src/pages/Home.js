import React, { useEffect, useState } from "react";
import XLSExtractor from "../components/XLSExtractor";
import UploadXLS from "../components/UploadXLS";
// import PDFViewer from "../components/PDFViewer";
import { useDispatch, useSelector } from "react-redux";
// import {
//   clearPdfFile,
//   clearPdfName,
//   clearPdfType,
// } from "../feature/textSelectedSlice";
// import { clearMessageInfo } from "../feature/messageInfoSlice";

const Home = () => {
  // const pdfFile = useSelector((state) => state.textSelectedStore.pdfFile);
  // const messageInfoFromStore = useSelector(
  //   (state) => state.messageInfoStore.messageInfo
  // );
  // const [clickHome, setClickHome] = useState(false);

  // const [messageInfo, setMessageInfo] = useState(messageInfoFromStore);

  // const dispatch = useDispatch();

  const handleHome = () => {
    console.log("handleHome");
    // setClickHome(true);
  };

  // useEffect(() => {
  //   // Défilement vers le haut de la page au chargement
  //   window.scrollTo(0, 0);
  //   setClickHome(false);
  // }, []);

  // useEffect(() => {
  //   setMessageInfo(messageInfoFromStore);
  //   setClickHome(false);
  // }, [messageInfoFromStore]);

  // useEffect(() => {
  //   dispatch(clearPdfFile());
  //   dispatch(clearPdfType());
  //   dispatch(clearPdfName());
  //   dispatch(clearMessageInfo());
  // }, [clickHome, dispatch]);

  let content = (
    <div className="home">
      <div className="home-title">
        <h1>XLS TVA Extractor</h1>
        <button onClick={handleHome}>
          <i className="fa-solid fa-house"></i>
        </button>
      </div>
      <div className="home-content">
        {/* <UploadXLS /> */}
        <XLSExtractor />
        {/* <p>
          <i className="fa-regular fa-hand-point-right"></i> {messageInfo}
        </p> */}
        {/* {pdfFile ? <PDFViewer pdfUrl={pdfFile} /> : null}
        {pdfFile ? <TextExtractor /> : null} */}
      </div>
    </div>
  );

  return content;
};

export default Home;
