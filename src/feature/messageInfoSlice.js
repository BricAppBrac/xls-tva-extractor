import { createSlice } from "@reduxjs/toolkit";

const messageInfoSlice = createSlice({
  name: "messageInfoStore",
  initialState: {
    messageInfo:
      "1- Sélectionner un fichier XLS\n 2- Cliquer sur le bouton Création et choisir le répertoire cible",
  },
  reducers: {
    setMessageInfo: (state, action) => {
      state.messageInfo = action.payload;
    },
    clearMessageInfo: (state) => {
      state.messageInfo =
        "1- Sélectionner un fichier XLS\n 2- Cliquer sur le bouton Création et choisir le répertoire cible";
    },
  },
});

export const { setMessageInfo, clearMessageInfo } = messageInfoSlice.actions;
export default messageInfoSlice.reducer;
