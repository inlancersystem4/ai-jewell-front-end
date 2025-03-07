import { configureStore } from "@reduxjs/toolkit";
import { authReducer, projectReducer } from "@/redux/reducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    p: projectReducer,
  },
});

export default store;
