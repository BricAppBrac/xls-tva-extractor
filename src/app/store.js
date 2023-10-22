import { configureStore } from "@reduxjs/toolkit";
import textSelectedReducer from "../feature/textSelectedSlice.js";
import messageInfoReducer from "../feature/messageInfoSlice.js";

const store = configureStore({
  reducer: {
    textSelectedStore: textSelectedReducer,
    messageInfoStore: messageInfoReducer,
  },

  // devTools: false, //PRODUCTION
  devTools: true, //DEVELOPPEMENT
});

// setupListeners(store.dispatch);

export default store;
