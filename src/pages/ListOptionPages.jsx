import { useState } from "react";
import { useParams } from "react-router-dom";
import Headers from "../components/admin/NavbarAdmin";
import { useGetQuestionQuery } from "../slices/QuestionApiSlice";
import { useCreateOptionMutation, useDeleteOptionMutation } from "../slices/OptionApiSlice";
import EditOptionModal from "../components/admin/Question/EditOptionModal";

const ListOptionPages = () => {
  let { id } = useParams();
  const [option, setOption] = useState("");
  const [isCorrect, setIsCorrect] = useState("");

  const { data: question, isLoading } = useGetQuestionQuery(id);
  const [createOption] = useCreateOptionMutation();
  const [deleteOption] = useDeleteOptionMutation();

  const handleCreateOption = async (e) => {
    e.preventDefault();
    if (!option || !isCorrect) {
      return;
    }
    await createOption({ question_id: id, option, is_correct: isCorrect });
    setOption("");
    setIsCorrect("");
    window.location.reload();
  };

  const handleDeleteOption = async (option_id) => {
    await deleteOption({ option_id });
    window.location.reload();
  };

  return (
    <>
      <Headers />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            marginTop: "50px",
            paddingInline: "300px",
          }}>
          <h1>List Option </h1>
          <h3>Latihan Soal: {question.data.question.title}</h3>
          {/* mapping option dalam bentuk tabel */}
          <table
            className="table"
            style={{
              marginTop: "10px",
              marginBottom: "50px",
            }}>
            <thead>
              <tr>
                <th>Option</th>
                <th>Is Correct</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* lihat apakah ada opsi */}
              {question.data.options.length === 0 ? (
                <tr>
                  <td></td>
                  <td colSpan="3">tidak ada options</td>
                  <td></td>
                </tr>
              ) : (
                question.data.options.map((optionData, index) => (
                  <tr key={index}>
                    <td>{optionData.option}</td>
                    <td>{optionData.is_correct ? "True" : "False"}</td>
                    <td>
                      <EditOptionModal
                        option_id={optionData.id}
                        question_id={optionData.question_id}
                      />
                      <button
                        style={{
                          marginInline: "20px",
                        }}
                        className="btn btn-secondary"
                        onClick={() => handleDeleteOption(optionData.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {question.data.options.length < 4 ? (
            <form>
              <h3>Masukkan Opsi</h3>
              <div className="form-group">
                <label
                  htmlFor="option"
                  style={{
                    marginTop: "20px",
                  }}>
                  Option
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "20px",
                  }}
                  className="form-control"
                  id="option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />
              </div>
              {question.data.options.find((option) => option.is_correct === 1) ? (
                <div className="form-group">
                  <label
                    htmlFor="isCorrect"
                    style={{
                      marginTop: "20px",
                    }}>
                    Is Correct
                  </label>
                  <select
                    style={{
                      marginTop: "20px",
                    }}
                    className="form-control"
                    id="isCorrect"
                    value={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.value)}>
                    <option value="">Pilih jawaban</option>
                    <option value="2">False</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label
                    htmlFor="isCorrect"
                    style={{
                      marginTop: "20px",
                    }}>
                    Is Correct
                  </label>
                  <select
                    style={{
                      marginTop: "20px",
                    }}
                    className="form-control"
                    id="isCorrect"
                    value={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.value)}>
                    <option value="">Pilih jawaban</option>
                    <option value="1">True</option>
                    <option value="2">False</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  marginTop: "20px",
                }}
                onClick={handleCreateOption}>
                Add Option
              </button>
            </form>
          ) : (
            <p>Maksimal Options adalah 4</p>
          )}
        </div>
      )}
    </>
  );
};

export default ListOptionPages;
