import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "../NavbarAdmin";
import { useGetQuestionsQuery, useUpdateQuestionMutation } from "../../../slices/QuestionApiSlice";
import { useGetChaptersQuery } from "../../../slices/ChapterApiSlice";

const EditQuestion = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [questionPreview, setQuestionPreview] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerPreview, setAnswerPreview] = useState("");
  const [chapter, setChapter] = useState("");

  const navigate = useNavigate();

  const { data: questions, refetch } = useGetQuestionsQuery(id);
  const { data: chapters } = useGetChaptersQuery();
  const [updateQuestion] = useUpdateQuestionMutation();

  const handleQuestionImage = (e) => {
    setQuestion(e.target.files[0]);
    setQuestionPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleAnswerImage = (e) => {
    setAnswer(e.target.files[0]);
    setAnswerPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("question", question);
    formData.append("explanation", answer);
    formData.append("chapter_id", chapter);
    await updateQuestion(formData);
    navigate("/listquestion");
  };

  useEffect(() => {
    if (questions) {
      const questionData = questions.data.find((q) => q.id == id);
      if (questionData) {
        setTitle(questionData.title);
        setChapter(questionData.chapter_id);
        setQuestionPreview(`${import.meta.env.VITE_API_URL}/question/${questionData.question}`);
        setAnswerPreview(`${import.meta.env.VITE_API_URL}/explanation/${questionData.explanation}`);
      }
    }
    refetch();
  }, [questions, id, refetch]);

  return (
    <>
      <Headers />
      <div
        className="container-edit-question"
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Edit Question</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label
                  htmlFor="title"
                  style={{
                    marginTop: "10px",
                  }}>
                  Title
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="question"
                  style={{
                    marginTop: "10px",
                  }}>
                  Question
                </label>
                <input
                  type="file"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  id="question"
                  onChange={handleQuestionImage}
                />
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                    display: questionPreview ? "block" : "none",
                  }}
                  src={questionPreview}
                  alt="Question"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="answer"
                  style={{
                    marginTop: "10px",
                  }}>
                  Answer
                </label>
                <input
                  type="file"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  id="answer"
                  onChange={handleAnswerImage}
                />
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                    display: answerPreview ? "block" : "none",
                  }}
                  src={answerPreview}
                  alt="Answer"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="chapter"
                  style={{
                    marginTop: "10px",
                  }}>
                  Chapter
                </label>
                <select
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  required>
                  <option value="">Select Chapter</option>
                  {chapters &&
                    chapters.chapters.map((chapter, index) => (
                      <option
                        key={index}
                        value={chapter.id}>
                        {chapter.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: "10px",
                }}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
