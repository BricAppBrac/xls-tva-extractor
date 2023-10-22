import { createSlice } from "@reduxjs/toolkit";

const textSelectedSlice = createSlice({
  name: "textSelectedStore",
  initialState: {
    // pdfFile: null,
    // pdfName: null,
    // pdfType: null,
    // textSelections: [],
    texteNom: "",
  },
  reducers: {
    // setPdfFile: (state, action) => {
    //   state.pdfFile = action.payload;
    // },
    // clearPdfFile: (state) => {
    //   state.pdfFile = null;
    // },
    setPdfName: (state, action) => {
      state.pdfName = action.payload;
    },
    clearPdfName: (state) => {
      state.pdfName = null;
    },
    // addTexteComplet: (state, action) => {
    //   state.texteComplet = action.payload;
    // },
    // clearTexteComplet: (state) => {
    //   state.texteComplet = "";
    // },
    // addTextSelection: (state, action) => {
    //   state.textSelections.push(action.payload);
    // },
    // clearTextSelections: (state) => {
    //   state.textSelections = [];
    // },
    // setPdfType: (state, action) => {
    //   state.pdfType = action.payload;
    // },
    // clearPdfType: (state) => {
    //   state.pdfType = null;
    // },
  },
});

export const {
  // setPdfFile,
  setPdfName,
  // setPdfType,
  // clearPdfFile,
  clearPdfName,
  // clearPdfType,
  // addTexteComplet,
  // clearTexteComplet,
  // addTextSelection,
  // clearTextSelections,
} = textSelectedSlice.actions;
export default textSelectedSlice.reducer;
