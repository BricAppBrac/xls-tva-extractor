import { createSlice } from "@reduxjs/toolkit";

const messageInfoSlice = createSlice({
  name: "messageInfoStore",
  initialState: {
    messageInfo: "Sélectionner un fichier PDF",
  },
  reducers: {
    setMessageInfo: (state, action) => {
      state.messageInfo = action.payload;
    },
    clearMessageInfo: (state) => {
      state.messageInfo = "Sélectionner un fichier PDF";
    },
  },
});

export const { setMessageInfo, clearMessageInfo } = messageInfoSlice.actions;
export default messageInfoSlice.reducer;
