import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import { profileReducer } from "./profileSlice";

import { ArticleReducer } from "./ArticleSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    profile: profileReducer,
    article: ArticleReducer,
  },
});
