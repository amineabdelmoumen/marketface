import { createSlice } from "@reduxjs/toolkit";
import { saveReferences } from "../lib/crud";

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
      ville: "Tanger-Assilah",
      pays: "Maroc",
      chiffre_affaire: "< 10 MDhs",
      annee_creation: "",
      raison_ou_nom: "",
      telephone: "",
      logo: "",
      siege_social: "",
    },
    marque: {
      titre: "",
      annee: "",
      description: "",
      categorie: "",
      nom_client: "",
      images: [],
      logo: null,
    },
    references: [],
    catalogue: {
      vous_etes: "franchisé",
      matiere: [],
      business: [],
      location: [],
      moyen: [],
      type_vente: [],
      produit_achete: [],
      distribution: [],
    },
    articles: [],
    article: {
      type_article: "produit",
      images: [],
      documents: [],
      nom: "",
      description: "",
      prix: "",
      quantite: "",
    },

    cible: {
      cherche: "Clients",
      regions: [],
      activites: [],
      taille_entreprise: [],
      activite_oprationnelle: [],
    },
    register: {
      titre: "m",
      poste: "directeur_general",
      terms: false,
    },
  },
  reducers: {
    setProfil: (state, action) => {
      if (action.payload.taille) {
        let profile = { ...action.payload };

        state.identite = profile;
      }
      let cible = {};
      if (action.payload.cibles && action.payload.cibles.length) {
        cible = { ...action.payload.cibles[0] };
      }
      if (Object.keys(cible).length) {
        state.cible = { ...cible };
        state.cible.regions = cible.regions.split(", ");
        state.cible.activites = cible.activites.split(", ");
        state.cible.taille_entreprise = cible.taille_entreprise.split(", ");
        state.cible.activite_oprationnelle =
          cible.activite_oprationnelle.split(", ");
      }
      if (action.payload.articles) {
        state.articles = [...action.payload.articles];
      }
      if (action.payload.references) {
        state.references = [...action.payload.references];
      }
      let catalogue = {};
      if (action.payload.catalogues && action.payload.catalogues.length) {
        catalogue = { ...action.payload.catalogues[0] };
      }
      if (Object.keys(catalogue).length) {
        state.catalogue = {
          id: catalogue.id,
          vous_etes: catalogue.vous_etes,
          matiere: catalogue.matiere.length ? catalogue.matiere.split(",") : [],
          business: catalogue.business.length
            ? catalogue.business.split(",")
            : [],
          location: catalogue.location.length
            ? catalogue.location.split(",")
            : [],
          moyen: catalogue.moyen.length ? catalogue.moyen.split(",") : [],
          type_vente: catalogue.type_vente.length
            ? catalogue.type_vente.split(",")
            : [],
          produit_achete: catalogue.produit_achete.length
            ? catalogue.produit_achete.split(",")
            : [],
          distribution: catalogue.distribution.length
            ? catalogue.distribution.split(",")
            : [],
        };
      }
    },
    setIdentite: (state, action) => {
      state.identite = action.payload;
    },
    setMarque: (state, action) => {
      state.marque = action.payload;
    },
    setCatalogue: (state, action) => {
      state.catalogue = action.payload;
    },

    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setCible: (state, action) => {
      state.cible = action.payload;
    },
    setRegister: (state, action) => {
      state.register = action.payload;
    },
    setReferences: (state, action) => {
      state.references = action.payload;
    },
  },
});

export const {
  setIdentite,
  setMarque,
  setCatalogue,
  setCible,
  setRegister,
  setArticle,
  setArticles,
  setReferences,
  setProfil,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
