import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./app/store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Importez pdfjs de la manière appropriée
// import pdfjs from "pdfjs-dist/build/pdf";

// Désactivez les avertissements liés aux workers

// if (process.env.NODE_ENV !== "production") {
//   pdfjs.GlobalWorkerOptions.workerSrc = null;
// }

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
