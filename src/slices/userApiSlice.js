import { apiSlice } from "./apiSlice";
const USERS_URL = "/api";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/user`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    getUserData: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
        body: data,
      }),
    }),
    changeUserRoles: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changerole`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        }),
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAllUsersQuery, useGetUserDataMutation, useUpdateUserDataMutation, useChangeUserRolesMutation } = userApiSlice;
