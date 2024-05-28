import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Header from "../components/admin/NavbarAdmin.jsx";
import { useGetQuestionsQuery, useDeleteQuestionMutation } from "../slices/QuestionApiSlice.js";

const ListQuestion = () => {
  const { data: questions, isLoading, refetch } = useGetQuestionsQuery();

  const navigate = useNavigate();

  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDeleteQuestion = async (id) => {
    await deleteQuestion({ id });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "50px",
          paddingInline: "250px",
        }}>
        <h1>Questions</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            striped
            bordered
            hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Chapter ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.data.map((question, index) => (
                <tr key={index}>
                  <td>{question.title}</td>
                  <td>
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                      src={`${import.meta.env.VITE_API_URL}/question/${question.question}`}
                      alt={question.title}
                    />
                  </td>
                  <td>
                    <img
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                      src={`${import.meta.env.VITE_API_URL}/explanation/${question.explanation}`}
                      alt={question.title}
                    />
                  </td>
                  <td
                    style={{
                      width: "100px",
                    }}>
                    {question.chapter_id}
                  </td>
                  <td
                    style={{
                      width: "330px",
                    }}>
                    <button
                      style={{ marginInline: "20px" }}
                      className="btn btn-primary"
                      onClick={() => navigate(`/editquestion/${question.id}`)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteQuestion(question.id)}>
                      Delete
                    </button>
                    <button
                      style={{ marginInline: "20px" }}
                      className="btn btn-primary"
                      onClick={() => navigate(`/listoption/${question.id}`)}>
                      Atur Option
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ListQuestion;
