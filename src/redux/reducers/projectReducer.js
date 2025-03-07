import { createReducer } from "@reduxjs/toolkit";
import {
  setAddProject,
  setProjectRefetch,
  setRenameProjectData,
} from "@/redux/actions";

const initialState = {
  addProjectOpen: false,
  activeProjectID: "",
  reNameProjectData: "",
  projectRefetch: "",
};

export const projectReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAddProject, (state, action) => {
    state.addProjectOpen = action.payload;
  });
  builder.addCase(setProjectRefetch, (state, action) => {
    state.projectRefetch = action.payload;
  });
  builder.addCase(setRenameProjectData, (state, action) => {
    state.reNameProjectData = action.payload;
    state.addProjectOpen = true;
  });
});
