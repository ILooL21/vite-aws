import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import store from "./store";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRoute from "./components/AdminRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomePages from "./pages/HomePages.jsx";
import FormAuth from "./pages/FormAuth.jsx";
import AdminPages from "./pages/AdminPages.jsx";
import ProfilePages from "./pages/ProfilePages.jsx";
import CategoryListPages from "./pages/CategoryListPages.jsx";
import CategoryDetailPages from "./pages/CategoryDetailPages.jsx";
import LessonDetailPages from "./pages/LessonDetailPages.jsx";
import ChapterDetailPages from "./pages/ChapterDetailPages.jsx";
import ExersicePages from "./pages/ExercisePages.jsx";
import ListUserPages from "./pages/ListUserPages.jsx";
import ListCategoryPages from "./pages/ListCategoryPages.jsx";
import AddCategory from "./components/admin/Category/AddCategory.jsx";
import EditCategory from "./components/admin/Category/EditCategory.jsx";
import ListLessonPages from "./pages/ListLessonPages.jsx";
import AddLesson from "./components/admin/Lesson/AddLesson.jsx";
import EditLesson from "./components/admin/Lesson/EditLesson.jsx";
import ListChapterPages from "./pages/ListChapterPages.jsx";
import AddChapter from "./components/admin/Chapter/AddChapter.jsx";
import EditChapter from "./components/admin/Chapter/EditChapter.jsx";
import ListQuestion from "./pages/ListQuestion.jsx";
import AddQuestion from "./components/admin/Question/AddQuestion.jsx";
import EditQuestion from "./components/admin/Question/EditQuestion.jsx";
import ListOptionPages from "./pages/ListOptionPages.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}>
      <Route
        index={true}
        path="/"
        element={<HomePages />}
      />
      <Route
        path="/auth"
        element={<FormAuth />}
      />
      <Route
        path="/category"
        element={<CategoryListPages />}
      />
      <Route
        path="/category/:id"
        element={<CategoryDetailPages />}
      />
      <Route
        path="/lesson/:id"
        element={<LessonDetailPages />}
      />
      <Route
        path="/chapter/:id"
        element={<ChapterDetailPages />}
      />
      <Route
        path="/question/:id"
        element={<ExersicePages />}
      />
      <Route
        path=""
        element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={<ProfilePages />}
        />
        <Route
          path=""
          element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<AdminPages />}
          />
          <Route
            path="/listuser"
            element={<ListUserPages />}
          />
          <Route
            path="/listcategory"
            element={<ListCategoryPages />}
          />
          <Route
            path="/addcategory"
            element={<AddCategory />}
          />
          <Route
            path="/editcategory/:id"
            element={<EditCategory />}
          />
          <Route
            path="/listlesson"
            element={<ListLessonPages />}
          />
          <Route
            path="/addlesson"
            element={<AddLesson />}
          />
          <Route
            path="/editlesson/:id"
            element={<EditLesson />}
          />
          <Route
            path="/listchapter"
            element={<ListChapterPages />}
          />
          <Route
            path="/addchapter"
            element={<AddChapter />}
          />
          <Route
            path="/editchapter/:id"
            element={<EditChapter />}
          />
          <Route
            path="/listquestion"
            element={<ListQuestion />}
          />
          <Route
            path="/addquestion"
            element={<AddQuestion />}
          />
          <Route
            path="/editquestion/:id"
            element={<EditQuestion />}
          />
          <Route
            path="/listoption/:id"
            element={<ListOptionPages />}
          />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
