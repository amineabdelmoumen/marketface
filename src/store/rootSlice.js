import { createSlice } from "@reduxjs/toolkit";

// Slice
const rootSlice = createSlice({
  name: "root",

  initialState: {
    FormStage: 1, // default page stage to show on page load
    FormUserSignup: "",
    FormUserCompany: "",
    user: {},
    members: [],
    messages: [],
    realTimeMessages: [],
    catalogues: [],
  },

  reducers: {
    setFormStage: (state, action) => {
      state.FormStage = action.payload;
    },
    setFormSignup: (state, action) => {
      state.FormUserSignup = action.payload;
    },
    setFormCompany: (state, action) => {
      state.FormUserCompany = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setRealTimeMessages: (state, action) => {
      state.realTimeMessages = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setCatalogues: (state, action) => {
      state.catalogues = action.payload;
    },
  },
});

// Actions
export const {
  setFormStage,
  setFormSignup,
  setFormCompany,
  setUser,
  setMessages,

  setRealTimeMessages,
  setMembers,
  setCatalogues,
} = rootSlice.actions;
export const rootReducer = rootSlice.reducer;
