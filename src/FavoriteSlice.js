import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

const persistConfig = {
  key: "favorites",
  storage,
};

export const { toggleFavorite } = favoritesSlice.actions;
export const persistedFavoritesReducer = persistReducer(
  persistConfig,
  favoritesSlice.reducer
);
