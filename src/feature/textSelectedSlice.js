import { createSlice } from "@reduxjs/toolkit";

const textSelectedSlice = createSlice({
  name: "textSelectedStore",
  initialState: {
    xlsName: null,
    xlsSelections: [],
  },
  reducers: {
    setXlsName: (state, action) => {
      state.xlsName = action.payload;
    },
    clearXlsName: (state) => {
      state.xlsName = null;
    },
    addXlsSelection: (state, action) => {
      state.xlsSelections.push(action.payload);
    },
    clearXlsSelections: (state) => {
      state.xlsSelections = [];
    },
  },
});

export const { setXlsName, clearXlsName, addXlsSelection, clearXlsSelections } =
  textSelectedSlice.actions;
export default textSelectedSlice.reducer;
