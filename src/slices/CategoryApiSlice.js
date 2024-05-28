import { apiSlice } from "./apiSlice";
const CATEGORIES_URL = "/api/category";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.id}/update`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.id}/delete`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApiSlice;
