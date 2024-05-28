import Header from "../NavbarAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChapterMutation } from "../../../slices/ChapterApiSlice";
import { useGetLessonsQuery } from "../../../slices/LessonApiSlice";

const AddChapter = () => {
  const [name, setName] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [description, setDescription] = useState("");
  const [videoCode, setVideoCode] = useState("");

  const { data: lessons, isLoading } = useGetLessonsQuery();

  const navigate = useNavigate();

  const [createChapter] = useCreateChapterMutation();

  const handleAddChapter = async (e) => {
    e.preventDefault();
    await createChapter({ name, lesson_id: lessonId, description, video_url: videoCode });
    navigate("/listchapter");
  };

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <h1>Add Chapter</h1>
        <form>
          <div className="mb-3">
            <label
              htmlFor="chapterName"
              className="form-label">
              Chapter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="chapterName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="videoCode"
              className="form-label">
              Video Code
            </label>
            <input
              type="text"
              className="form-control"
              id="videoCode"
              value={videoCode}
              onChange={(e) => setVideoCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="lessonId"
              className="form-label">
              Lesson
            </label>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <select
                className="form-select"
                id="lessonId"
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}>
                <option value="">Select Lesson</option>
                {lessons.lessons.map((lesson, index) => (
                  <option
                    key={index}
                    value={lesson.id}>
                    {lesson.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleAddChapter(e)}>
            Add Chapter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
