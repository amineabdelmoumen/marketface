import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    identite: {
      activite: "Agriculture, Sylviculture Et Pêche",
      statut: "SARL",
      type: "Entreprise",
      taille: "De 1 à 10",
      nombre_employes: "De 1 à 10",
      region: "Casablanca-Settat",
      ville: "Tanger-Assilah"
    },
    marque: {
      titre: '',
      annee: '',
      description: '',
      categorie: 'Produits chimiques',
      nom_client: '',
      images: [],
      logo: null
    },
    references: [],
    catalogue: {
      vous_etes: 'franchisé',
      matiere: [],
      business: [],
      location: [],
      moyen: [],
      type_vente: [],
      produit_achete: [],
      distribution: []
    },
    articles: [],
    article: {
      type_article: "Produit"
    },
    cible: {
      cherche: "Clients"
    },
    register: {
      titre: 'm',
      poste: 'directeur_general'
    }
  },
  reducers: {
    setProfil: (state, action) => {
      state.identite = {...action.payload}
      const cible = {...action.payload.cibles[0]}
      if(Object.keys(cible).length) {
        state.cible = {...cible}
        state.cible.regions = cible.regions.split(', ')
        state.cible.activites = cible.activites.split(', ')
      }
      state.articles = [...action.payload.articles]
      state.references = [...action.payload.references]
      const catalogue = {...action.payload.catalogues[0]}
      if(Object.keys(catalogue).length) {
        state.catalogue = {
          id: catalogue.id,
          vous_etes: catalogue.vous_etes,
          matiere: catalogue.matiere.split(','),
          business: catalogue.business.split(','),
          location: catalogue.location.split(','),
          moyen: catalogue.moyen.split(','),
          type_vente: catalogue.type_vente.split(','),
          produit_achete: catalogue.produit_achete.split(','),
          distribution: catalogue.distribution.split(',')
        }
      }
    },
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

export const { setIdentite, setMarque, setCatalogue, setCible, setRegister, setArticle, setArticles, setReferences, setProfil } = profileSlice.actions
export const profileReducer = profileSlice.reducer