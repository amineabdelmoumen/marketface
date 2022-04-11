import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import { profileReducer } from "./profileSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    root: rootReducer,
    profile: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
