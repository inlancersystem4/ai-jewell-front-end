import { createReducer } from "@reduxjs/toolkit";
import { setJwtToken } from "@/redux/actions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  jwtToken: cookies.get("jwtToken") || "",
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setJwtToken, (state, action) => {
    state.jwtToken = action.payload;
    cookies.set("jwtToken", action.payload, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  });
});
