import { apiSlice } from "./apiSlice";
const CHAPTER_URL = "/api/chapter";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const chapterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: () => ({
        url: `${CHAPTER_URL}`,
        method: "GET",
      }),
    }),
    getChapter: builder.query({
      query: (id) => ({
        url: `${CHAPTER_URL}/${id}`,
        method: "GET",
      }),
    }),
    createChapter: builder.mutation({
      query: (data) => ({
        url: `${CHAPTER_URL}`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    updateChapter: builder.mutation({
      query: (data) => ({
        url: `${CHAPTER_URL}/${data.id}/update`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `${CHAPTER_URL}/${id.id}/delete`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
  }),
});

export const { useGetChaptersQuery, useGetChapterQuery, useCreateChapterMutation, useUpdateChapterMutation, useDeleteChapterMutation } = chapterApiSlice;
