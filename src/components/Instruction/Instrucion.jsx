import "./instruction.css";
import linkedInIcon from "../../assets/linkedin.svg";

const Instruction = ({ openInstruction, setOpenInstruction }) => {
  return (
    <div className={`instruction ${openInstruction ? "open" : ""}`}>
      <h2>How to use</h2>
      <h3>1. Choose preffered speed (default 1x).</h3>
      <h3>2. Modify displayed array.</h3>
      <h3>3. Select the algorithm you want to use.</h3>
      <h3>4. Reset and try other algorithms.</h3>
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
