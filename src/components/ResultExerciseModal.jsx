import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useAnswerQuestionMutation } from "../slices/QuestionApiSlice";
import { toast } from "react-toastify";

const ResultExerciseModal = ({ id, option, explanation, chapterID }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const [answerQuestion] = useAnswerQuestionMutation();

  const handleClose = () => {
    setShow(false);
    navigate(`/chapter/${chapterID}`);
  };

  const handleShow = async () => {
    if (!option) {
      toast.error("Jawaban tidak boleh kosong");
      return;
    }
    try {
      const res = await answerQuestion({ id, option });
      setMessage(res.data.msg);
      setAnswer(res.data.answer.option);
      setShow(true);
    } catch (err) {
      console.error("Failed to submit answer:", err);
    }
  };

  return (
    <>
      <div className="container-button-game-screen">
        <button onClick={handleShow}>Jawab</button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hasil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message === "Correct Answer" ? (
            <div
              className="alert alert-primary"
              role="alert">
              Jawaban Benar
            </div>
          ) : (
            <div
              className="alert alert-danger"
              role="alert">
              Jawaban Salah
            </div>
          )}
          <p>Jawaban: {answer}</p>
          <p>Pembahasan:</p>
          <img
            style={{
              width: "100%",
              height: "auto",
            }}
            src={`${import.meta.env.VITE_API_URL}/explanation/${explanation}`}
            alt="answer"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ResultExerciseModal.propTypes = {
  id: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  chapterID: PropTypes.string.isRequired,
};

export default ResultExerciseModal;
