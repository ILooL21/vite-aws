import { apiSlice } from "./apiSlice";
const QUESTION_URL = "/api/question";

const user = JSON.parse(localStorage.getItem("userInfo"));

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => ({
        url: `${QUESTION_URL}`,
        method: "GET",
      }),
    }),
    getQuestion: builder.query({
      query: (id) => ({
        url: `${QUESTION_URL}/${id}`,
        method: "GET",
      }),
    }),
    answerQuestion: builder.mutation({
      query: (data) => ({
        url: `${QUESTION_URL}/${data.id}/answer`,
        method: "POST",
        body: data,
      }),
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: `${QUESTION_URL}`,
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `${QUESTION_URL}/${data.get("id")}/update`,
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (data) => ({
        url: `${QUESTION_URL}/${data.id}/delete`,
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${user?.token}`,
        }),
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionQuery, useAnswerQuestionMutation, useCreateQuestionMutation, useUpdateQuestionMutation, useDeleteQuestionMutation } = questionApiSlice;
