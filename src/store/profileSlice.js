import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      identite: {},
      marque: {},
      catalogue: {},
      cible: {}
    }
  },
  reducers: {
    setIdentite: (state, action) => {
      state.profile.identite = action.payload
    },
    setMarque: (state, action) => {
      state.profile.marque = action.payload
    },
    setCatalogue: (state, action) => {
      state.profile.catalogue = action.payload
    },
    setCible: (state, action) => {
      state.profile.cible = action.payload
    },
  }
})

export const { setIdentite, setMarque, setCatalogue, setCible } = profileSlice.actions
export const profileReducer = profileSlice.reducer