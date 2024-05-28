import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "../NavbarAdmin";
import { useGetLessonsQuery, useUpdateLessonMutation } from "../../../slices/LessonApiSlice";
import { useGetCategoriesQuery } from "../../../slices/CategoryApiSlice";

const EditLesson = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  let { data: lessons, isLoading, refetch } = useGetLessonsQuery(id);
  let { data: categories } = useGetCategoriesQuery();
  const [updateLesson] = useUpdateLessonMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateLesson({ id, name, description, category_id: category });
    navigate("/listlesson");
  };

  useEffect(() => {
    if (lessons) {
      const lesson = lessons.lessons.find((l) => l.id == id);
      setName(lesson.name);
      setDescription(lesson.description);
      setCategory(lesson.category_id);
    }
    refetch();
  }, [lessons, id, refetch]);

  return (
    <>
      <Headers />
      <div
        className="container-edit-lesson"
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Edit Lesson</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label
                  htmlFor="name"
                  style={{
                    marginTop: "10px",
                  }}>
                  Name
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={isLoading ? "Loading..." : name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="description"
                  style={{
                    marginTop: "10px",
                  }}>
                  Description
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={isLoading ? "Loading..." : description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="category"
                  style={{
                    marginTop: "10px",
                  }}>
                  Category
                </label>
                <select
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required>
                  <option value="">Select Category</option>
                  {categories &&
                    categories.categories.map((category, index) => (
                      <option
                        key={index}
                        value={category.id}>
                        {category.id}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: "20px",
                }}>
                Update Lesson
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLesson;
