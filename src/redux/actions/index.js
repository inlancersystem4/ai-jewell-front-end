import { createAction } from "@reduxjs/toolkit";

export const setJwtToken = createAction("SET_JWT_TOKEN");
export const setJwtExpired = createAction("SET_JWT_EXPIRED");