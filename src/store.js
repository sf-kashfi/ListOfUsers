import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./service/service";
import { persistedFavoritesReducer } from "./FavoriteSlice";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    usersApi: usersApi.reducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(usersApi.middleware),
});

export const persistor = persistStore(store);
