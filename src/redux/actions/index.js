import { createAction } from "@reduxjs/toolkit";

export const setJwtToken = createAction("SET_JWT_TOKEN");
export const setJwtExpired = createAction("SET_JWT_EXPIRED");
export const setUserID = createAction("SET_USER_ID");
export const setActiveChat = createAction("SET_ACTIVE_CHAT");
export const setChatPending = createAction("SET_CHAT_PENDING");
export const setNewChat = createAction("SET_NEW_CHAT");
export const setIsChated = createAction("SET_IS_CHATED");
export const setLastAiChatID = createAction("SET_LAST_AI_CHAT_ID");
export const setLastUserChatID = createAction("SET_LAST_USER_CHAT_ID");
