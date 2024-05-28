import Header from "../NavbarAdmin.jsx";
import { useGetCategoriesQuery } from "../../../slices/CategoryApiSlice.js";
import { useCreateLessonMutation } from "../../../slices/LessonApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddLesson = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createLesson] = useCreateLessonMutation();

  const handleAddLesson = async (e) => {
    e.preventDefault();
    await createLesson({ name: title, description, category_id: category });
    navigate("/listlesson");
  };

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <h1>Add Lesson</h1>
        <form>
          <div
            className="form-group"
            style={{
              marginTop: "20px",
            }}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              style={{
                marginTop: "20px",
              }}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="description"
              style={{
                marginTop: "20px",
              }}>
              Description
            </label>
            <input
              type="text"
              style={{
                marginTop: "20px",
              }}
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="category"
              style={{
                marginTop: "20px",
              }}>
              Category
            </label>
            <select
              style={{
                marginTop: "20px",
              }}
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option>Select Category</option>
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                categories.categories.map((category, index) => (
                  <option
                    key={index}
                    value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <button
            style={{ marginTop: "20px" }}
            type="submit"
            className="btn btn-primary"
            onClick={handleAddLesson}>
            Add Lesson
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLesson;
