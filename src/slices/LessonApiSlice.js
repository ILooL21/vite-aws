import { apiSlice } from "./apiSlice";
const LESSONS_URL = "/api/lesson";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: `${LESSONS_URL}`,
        method: "GET",
      }),
    }),
    getLesson: builder.query({
      query: (id) => ({
        url: `${LESSONS_URL}/${id}`,
        method: "GET",
      }),
    }),
    createLesson: builder.mutation({
      query: (data) => ({
        url: `${LESSONS_URL}`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    updateLesson: builder.mutation({
      query: (data) => ({
        url: `${LESSONS_URL}/${data.id}/update`,
        method: "POST",
        body: data,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
    deleteLesson: builder.mutation({
      query: (data) => ({
        url: `${LESSONS_URL}/${data.id}/delete`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }),
      }),
    }),
  }),
});

export const { useGetLessonsQuery, useGetLessonQuery, useCreateLessonMutation, useUpdateLessonMutation, useDeleteLessonMutation } = lessonApiSlice;
