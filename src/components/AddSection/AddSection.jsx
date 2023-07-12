import { useState } from "react";
import "./AddSection.css";
const AddSection = ({ setData, setLocked, setPressedAgain, locked }) => {
  const [numbers, setNumbers] = useState("");
  const [error, setError] = useState("");
  const addRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 10);
    while (randomNumber === 0) {
      randomNumber = Math.floor(Math.random() * 10);
    }
    setData((prevData) => [...prevData, randomNumber]);
  };
  const handleChange = (e) => {
    setNumbers(e.target.value);
  };
  const handleAddNumbers = () => {
    const regex = /^(\d+,)*\d+$/;
    if (!numbers.match(regex)) {
      setError("Input must only contain numbers separated by commas");
    } else {
      const numberArray = numbers.split(",").map(Number);
      if (numberArray.some((num) => num >= 30)) {
        setError("All numbers must be less than 30");
      } else {
        setError("");
        setData((prevData) => [...prevData, ...numberArray]);
      }
    }
  };
  const handleClear = () => {
    if (!locked) {
      setData([]);
      setLocked(false);
      setPressedAgain(false);
    } else {
      console.log("blad");
    }
  };
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className="add-inputs">
        <button
          className="random-btn custom-styled-btn"
          onClick={() => {
            addRandomNumber();
          }}
        >
          Add Random
        </button>
        <div className="add-more-numbers">
          <input
            type="text"
            id="numbers"
            name="numbers"
            onChange={handleChange}
            placeholder="1,2,3"
            required
          ></input>
          {error.length > 0 && <h3 className="error">{error}</h3>}
          <button
            className="add-numbers-btn custom-styled-btn"
            onClick={() => {
              handleAddNumbers();
            }}
          >
            Add
          </button>
        </div>
        <div className="reset">
          <button
            className="clear-btn custom-styled-btn"
            onClick={() => {
              handleClear();
            }}
          >
            Clear
          </button>
          <button
            className="reset-btn custom-styled-btn"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
