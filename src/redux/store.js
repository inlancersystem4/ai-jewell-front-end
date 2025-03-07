import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  projectReducer,
  conversationReducer,
} from "@/redux/reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    p: projectReducer,
    c: conversationReducer,
  },
});

export default store;
