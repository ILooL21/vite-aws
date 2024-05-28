import Header from "../NavbarAdmin.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateQuestionMutation } from "../../../slices/QuestionApiSlice.js";
import { useGetChaptersQuery } from "../../../slices/ChapterApiSlice.js";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [questionPreview, setQuestionPreview] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerPreview, setAnswerPreview] = useState("");
  const [chapter, setChapter] = useState("");

  const navigate = useNavigate();

  const { data: chapters } = useGetChaptersQuery();
  const [createQuestion] = useCreateQuestionMutation();

  const handleQuestionImage = (e) => {
    setQuestion(e.target.files[0]);
    setQuestionPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleAnswerImage = (e) => {
    setAnswer(e.target.files[0]);
    setAnswerPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("question", question);
    formData.append("explanation", answer);
    formData.append("chapter_id", chapter);
    await createQuestion(formData);
    navigate("/listquestion");
  };

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "300px",
        }}>
        <h1>Add Question</h1>
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
              htmlFor="question"
              style={{
                marginTop: "20px",
              }}>
              Question
            </label>
            <input
              type="file"
              style={{
                marginTop: "20px",
              }}
              className="form-control"
              id="question"
              onChange={handleQuestionImage}
            />
            {questionPreview && (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  display: questionPreview ? "block" : "none",
                }}
                src={questionPreview}
                alt="Question"
              />
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="answer"
              style={{
                marginTop: "20px",
              }}>
              Answer
            </label>
            <input
              type="file"
              style={{
                marginTop: "20px",
              }}
              className="form-control"
              id="answer"
              onChange={handleAnswerImage}
            />
            {answerPreview && (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "20px",
                  display: answerPreview ? "block" : "none",
                }}
                src={answerPreview}
                alt="Answer"
              />
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="chapter"
              style={{
                marginTop: "20px",
              }}>
              Chapter
            </label>
            <select
              className="form-control"
              style={{
                marginTop: "20px",
              }}
              id="chapter"
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
              marginTop: "20px",
              marginBottom: "50px",
            }}
            onClick={handleAddQuestion}>
            Add Question
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuestion;
