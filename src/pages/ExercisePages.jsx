import { useParams } from "react-router-dom";
import { useGetQuestionQuery } from "../slices/QuestionApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ResultExerciseModal from "../components/ResultExerciseModal";
import "../styles/ExercisePages.css";

const ExersicePages = () => {
  let { id } = useParams();
  const [jawaban, setJawaban] = useState("");
  const [options, setOptions] = useState([]);

  const { data: question, isLoading } = useGetQuestionQuery(id);

  useEffect(() => {
    if (question !== undefined) {
      let shuffledOptions = [...question.data.options];
      shuffledOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    }
  }, [question]);

  return (
    <>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : //jika options kosong atau kurang dari 4 maka akan menampilkan soal belum siap
      options.length < 4 ? (
        <div className="container-exercise">
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginTop: "100px",
            }}>
            Soal belum siap
          </p>
        </div>
      ) : (
        <div className="container-exercise">
          <div>
            <h1>{question.data.question.title}</h1>
            <img
              src={`${import.meta.env.VITE_API_URL}/question/${question.data.question.question}`}
              alt={question.data.question.title}
            />
            <div
              style={{
                paddingInline: "250px",
              }}>
              <h2>Pilihan Jawaban</h2>
              <div
                style={{
                  padding: "10px",
                }}>
                {options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={option.id}
                      name="jawaban"
                      value={option.id}
                      onChange={(e) => setJawaban(e.target.value)}
                    />
                    <label htmlFor={option.id}>{option.option}</label>
                  </div>
                ))}
              </div>
              <ResultExerciseModal
                option={jawaban}
                id={id}
                explanation={question.data.question.explanation}
                chapterID={question.data.question.chapter_id}
              />
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          marginTop: "50px",
        }}>
        <Footer />
      </div>
    </>
  );
};

export default ExersicePages;
