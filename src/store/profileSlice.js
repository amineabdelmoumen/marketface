import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    identite: {},
    marque: {
      titre: '',
      annee: '',
      description: '',
      categorie: '',
      nom_client: '',
      images: [],
      logo: null
    },
    references: [],
    catalogue: {},
    articles: [],
    article: {},
    cible: {},
    register: {}
  },
  reducers: {
    setIdentite: (state, action) => {
      state.identite = action.payload
    },
    setMarque: (state, action) => {
      state.marque = action.payload
    },
    setCatalogue: (state, action) => {
      state.catalogue = action.payload
    },
    setArticles: (state, action) => {
      state.articles = action.payload
    },
    setArticle: (state, action) => {
      state.article = action.payload
    },
    setCible: (state, action) => {
      state.cible = action.payload
    },
    setRegister: (state, action) => {
      state.register = action.payload
    },
    setReferences: (state, action) => {
      state.references = action.payload
    }
  }
})

export const { setIdentite, setMarque, setCatalogue, setCible, setRegister, setArticle, setArticles, setReferences } = profileSlice.actions
export const profileReducer = profileSlice.reducer