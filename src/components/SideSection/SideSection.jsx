import AddSection from "../AddSection/AddSection";
import "./sidesection.css";
const SideSection = ({
  handleSort,
  setDelay,
  setData,
  setLocked,
  setPressedAgain,
  setStop,
}) => {
  return (
    <div className="buttons">
      <div className="delay-buttons">
        <button className="delay-btn" onClick={() => setDelay(1000)}>
          0.5x
        </button>
        <button className="delay-btn" onClick={() => setDelay(500)}>
          1x
        </button>
        <button className="delay-btn" onClick={() => setDelay(250)}>
          2x
        </button>
      </div>
      <button
        className="sort-btn custom-styled-btn"
        onClick={() => handleSort("bubble")}
      >
        Bubble Sort
      </button>
      <button
        className="sort-btn custom-styled-btn "
        onClick={() => handleSort("selection")}
      >
        Selection Sort
      </button>
      <button
        className="sort-btn custom-styled-btn"
        onClick={() => handleSort("insertion")}
      >
        Insertion Sort
      </button>
      <button
        className="sort-btn custom-styled-btn"
        onClick={() => handleSort("quick")}
      >
        Quick Sort
      </button>
      <button
        className="sort-btn custom-styled-btn"
        onClick={() => handleSort("merge")}
      >
        Merge Sort
      </button>
      <button
        className="sort-btn custom-styled-btn"
        onClick={() => handleSort("bogo")}
      >
        Bogo Sort
      </button>
      <AddSection
        setData={setData}
        setLocked={setLocked}
        setPressedAgain={setPressedAgain}
        setStop={setStop}
      ></AddSection>
    </div>
  );
};

export default SideSection;
