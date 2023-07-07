import { useState, useEffect } from "react";
import "./App.css";
import SortButtons from "./components/SideSection/SideSection";
import Graph from "./components/Graph/Graph";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  bogoSort,
  quickSort,
} from "./SortFunctions";
import Instruction from "./components/Instruction/Instrucion";

function App() {
  const [data, setData] = useState([1, 2, 3, 5, 3, 10, 2]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [highlightPrevious, setHighlightPrevious] = useState(-1);
  const [delay, setDelay] = useState(500);
  const [locked, setLocked] = useState(false);
  const [pressedAgain, setPressedAgain] = useState(false);
  const [stop, setStop] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(false);

  const handleSort = (sortingName) => {
    if (!locked) {
      setLocked(!locked);
      switch (sortingName) {
        case "bubble":
          bubbleSort(
            data,
            setData,
            setHighlightIndex,
            setHighlightPrevious,
            delay,
            stop
          );

          break;
        case "selection":
          selectionSort(
            data,
            setData,
            setHighlightIndex,
            setHighlightPrevious,
            delay
          );
          break;
        case "insertion":
          insertionSort(
            data,
            setData,
            setHighlightIndex,
            setHighlightPrevious,
            delay
          );
          break;
        case "quick":
          quickSort(
            data,
            setData,
            setHighlightIndex,
            setHighlightPrevious,
            0,
            data.length,
            delay
          );
          console.log(data);
          break;
        case "bogo":
          bogoSort(data, setData, setHighlightIndex, delay);
          break;
      }
    } else {
      setPressedAgain(true);
    }
  };

  return (
    <div className="container">
      {!openInstruction && (
        <button
          onClick={() => {
            setOpenInstruction(!openInstruction);
          }}
          className="arrow-btn"
        >
          &rarr;
        </button>
      )}
      {openInstruction && (
        <Instruction
          openInstruction={openInstruction}
          setOpenInstruction={setOpenInstruction}
        ></Instruction>
      )}
      {pressedAgain && (
        <h3 className="error">Algorithm has been already chosen.</h3>
      )}
      <main>
        <Graph
          data={data}
          highlightIndex={highlightIndex}
          highlightPrevious={highlightPrevious}
        ></Graph>
        <SortButtons
          handleSort={handleSort}
          setDelay={setDelay}
          setData={setData}
          setLocked={setLocked}
          setPressedAgain={setPressedAgain}
          setStop={setStop}
        ></SortButtons>
      </main>
    </div>
  );
}

export default App;
