import { createReducer } from "@reduxjs/toolkit";
import { setConversationRefetch } from "@/redux/actions";

const initialState = {
  conversationRefetch: "",
};

export const conversationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setConversationRefetch, (state, action) => {
    state.conversationRefetch = action.payload;
  });
});
