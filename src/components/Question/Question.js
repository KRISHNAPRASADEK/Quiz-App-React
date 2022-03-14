import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrrorMessage/ErrorMessage";
import "./Question.css";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  setQuestions,
  correct,
  options,
  score,
  setScore,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const history = useNavigate();

  const handleSelect = (option) => {
    if (selected === option && selected === correct) {
      return "select";
    } else if (selected === option && selected !== correct) {
      return "wrong";
    } else if (option === correct) {
      return "select";
    }
  };

  const handleCheck = (option) => {
    setSelected(option);
    if (option === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      history("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("Please select an option first");
    }
  };

  const handleQuit = (e) => {
    setCurrQues(0);
    setQuestions();
    history("/");
    e.preventDefault();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((option, i) => (
              <button
                onClick={() => handleCheck(option)}
                className={`singleOption ${selected && handleSelect(option)}`}
                disabled={selected}
                key={i}
              >
                {option}
              </button>
            ))}
        </div>

        <div className="controls">
          <Button
            style={{ width: 185 }}
            variant="contained"
            color="error"
            size="large"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            style={{ width: 185 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
