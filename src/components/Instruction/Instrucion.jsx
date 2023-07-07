import "./instruction.css";
import linkedInIcon from "./linkedin.svg";

const Instruction = ({ openInstruction, setOpenInstruction }) => {
  return (
    <div className={`instruction ${openInstruction ? "open" : ""}`}>
      <h2>How to use</h2>
      <h3>1. Choose preffered speed (default 1x).</h3>
      <h3>2. Choose algorythm, which you want to check.</h3>
      <h3>3. Modify shown array.</h3>
      <h3>4. Clear or reset and check other algorythms</h3>
      <button
        onClick={() => setOpenInstruction(!openInstruction)}
        className="arrow-btn-left"
      >
        &larr;
      </button>
      <a
        href="https://www.linkedin.com/in/mateusz-rojek-699929269/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkedInIcon} alt="LinkedIn" />
      </a>
    </div>
  );
};

export default Instruction;
