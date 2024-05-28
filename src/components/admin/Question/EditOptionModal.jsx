import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useGetQuestionQuery } from "../../../slices/QuestionApiSlice";
import { useUpdateOptionMutation } from "../../../slices/OptionApiSlice";
import PropTypes from "prop-types";

const EditOptionModal = ({ option_id, question_id }) => {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("");
  const [isCorrect, setIsCorrect] = useState("");

  const { data: optionData, isLoading } = useGetQuestionQuery(question_id);
  const [updateOption] = useUpdateOptionMutation();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleUpdateOption = async (e) => {
    e.preventDefault();
    if (!option || !isCorrect) {
      return;
    }

    const data = {
      id: option_id,
      option,
      is_correct: isCorrect,
    };
    await updateOption(data);
    window.location.reload();
  };

  useEffect(() => {
    if (!isLoading && optionData) {
      const option = optionData.data.options.find((option) => option.id === option_id);
      setOption(option.option);
      setIsCorrect(option.is_correct.toString());
    }
  }, [optionData, option_id, isLoading]);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleUpdateOption}>
              <div className="form-group">
                <label
                  style={{
                    marginTop: "10px",
                  }}>
                  Option
                </label>
                <input
                  type="text"
                  style={{
                    marginTop: "10px",
                  }}
                  className="form-control"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label
                  style={{
                    marginTop: "10px",
                  }}>
                  Is Correct
                </label>
                {optionData.data.options.find((option) => option.is_correct === 1) ? (
                  optionData.data.options.find((option) => option.is_correct === 1).id === option_id ? (
                    <select
                      style={{
                        marginTop: "10px",
                      }}
                      className="form-control"
                      value={isCorrect}
                      onChange={(e) => setIsCorrect(e.target.value)}>
                      <option value="1">True</option>
                      <option value="2">False</option>
                    </select>
                  ) : (
                    <select
                      style={{
                        marginTop: "10px",
                      }}
                      className="form-control"
                      value={isCorrect}
                      onChange={(e) => setIsCorrect(e.target.value)}>
                      <option value="2">False</option>
                    </select>
                  )
                ) : (
                  <select
                    style={{
                      marginTop: "10px",
                    }}
                    className="form-control"
                    value={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.value)}>
                    <option value="1">True</option>
                    <option value="2">False</option>
                  </select>
                )}
              </div>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                }}
                className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

EditOptionModal.propTypes = {
  option_id: PropTypes.number.isRequired,
  question_id: PropTypes.number.isRequired,
};

export default EditOptionModal;
