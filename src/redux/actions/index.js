import { createAction } from "@reduxjs/toolkit";

export const setJwtToken = createAction("SET_JWT_TOKEN");
export const setAddProject = createAction("SET_ADD_PROJECT");
export const setProjectRefetch = createAction("SET_PROJECT_REFETCH");
export const setRenameProjectData = createAction("SET_RENAME_PROJECT_ID");
export const setConversationRefetch = createAction("SET_CONVERSATION_REFETCH");
