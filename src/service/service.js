import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React from "react";
import { useSelector } from "react-redux";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://67c82dad0acf98d070854ab8.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (searchTerm) =>
        searchTerm ? `users?search=${searchTerm}` : "users",
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    getFavorites: builder.query({
      query: () => "faivorites",
    }),
    addFavorite: builder.mutation({
      query: (user) => ({
        url: "faivorites",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFavorite: builder.mutation({
      query: (id) => ({
        url: `faivorites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = usersApi;
