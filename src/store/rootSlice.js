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
    formStage: (state, action) => { state.FormStage = action.payload },
    formSignup: (state, action) => { state.FormUserSignup = action.payload },
    formCompany: (state, action) => { state.FormUserCompany = action.payload }
  }

})

// Actions
export const { formStage, formSignup, formCompany } = rootSlice.actions
export const reducer = rootSlice.reducer;
