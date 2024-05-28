import { apiSlice } from "./apiSlice";
const OPTION_URL = "/api/option";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const optionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: () => ({
        url: `${OPTION_URL}`,
        method: "GET",
      }),
    }),
    getOptionsById: builder.query({
      query: (id) => ({
        url: `${OPTION_URL}/${id}`,
        method: "GET",
      }),
    }),
    createOption: builder.mutation({
      query: (data) => ({
        url: `${OPTION_URL}`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    updateOption: builder.mutation({
      query: (data) => ({
        url: `${OPTION_URL}/${data.id}/update`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    deleteOption: builder.mutation({
      query: (data) => ({
        url: `${OPTION_URL}/${data.option_id}/delete`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
  }),
});

export const { useGetOptionsQuery, useGetOptionsByIdQuery, useCreateOptionMutation, useUpdateOptionMutation, useDeleteOptionMutation } = optionApiSlice;
