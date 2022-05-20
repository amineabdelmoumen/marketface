import { createSlice } from "@reduxjs/toolkit";

const ArticleSlice = createSlice({
  name: "article",
  initialState: {
    selectedArticle: {},
  },

  reducers: {
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});
export const { setSelectedArticle } = ArticleSlice.actions;
export const ArticleReducer = ArticleSlice.reducer;
