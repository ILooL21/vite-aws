import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "../NavbarAdmin";
import { useGetChaptersQuery, useUpdateChapterMutation } from "../../../slices/ChapterApiSlice";
import { useGetLessonsQuery } from "../../../slices/LessonApiSlice";

const EditChapter = () => {
  let { id } = useParams();
  const [chapter, setChapter] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [description, setDescription] = useState("");
  const [videoCode, setVideoCode] = useState("");

  const navigate = useNavigate();

  let { data: chapters, isLoading, refetch } = useGetChaptersQuery(id);
  const { data: lessons } = useGetLessonsQuery();
  const [updateChapter] = useUpdateChapterMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateChapter({ id, name: chapter, lesson_id: lessonId, description, video_url: videoCode });
    navigate("/listchapter");
  };

  useEffect(() => {
    if (chapters) {
      const chapter = chapters.chapters.find((c) => c.id == id);
      setChapter(chapter.name);
      setLessonId(chapter.lesson_id);
      setDescription(chapter.description);
      setVideoCode(chapter.video_url);
    }
    refetch();
  }, [chapters, id, refetch]);

  return (
    <>
      <Headers />
      <div
        className="container-edit-chapter"
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Edit Chapter</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label
                  htmlFor="name"
                  style={{
                    marginTop: "10px",
                  }}>
                  Chapter Name
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={isLoading ? "Loading..." : chapter}
                  onChange={(e) => setChapter(e.target.value)}
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
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="videoCode"
                  style={{
                    marginTop: "10px",
                  }}>
                  Video Code
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={isLoading ? "Loading..." : videoCode}
                  onChange={(e) => setVideoCode(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lessonId"
                  style={{
                    marginTop: "10px",
                  }}>
                  Lesson ID
                </label>
                <select
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  required>
                  <option value="">Select Lesson</option>
                  {lessons &&
                    lessons.lessons.map((lesson, index) => (
                      <option
                        key={index}
                        value={lesson.id}>
                        {lesson.name}
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
                Update Chapter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChapter;
