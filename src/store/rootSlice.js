import { createSlice } from '@reduxjs/toolkit'

// Slice
const rootSlice = createSlice({
  
  name: "root",

  initialState: {
    FormStage: 1, // default page stage to show on page load
    FormUserSignup: "",
    FormUserCompany: ""
  },

  reducers: {
    setFormStage: (state, action) => { state.FormStage = action.payload },
    setFormSignup: (state, action) => { state.FormUserSignup = action.payload },
    setFormCompany: (state, action) => { state.FormUserCompany = action.payload }
  }

})

// Actions
export const { setFormStage, setFormSignup, setFormCompany } = rootSlice.actions
export const rootReducer = rootSlice.reducer;
