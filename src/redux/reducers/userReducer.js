import { createReducer } from "@reduxjs/toolkit";
import { setUserID } from "@/redux/actions";

const initialState = {
  userID: 0,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserID, (state, action) => {
    state.userID = action.payload;
  });
});
