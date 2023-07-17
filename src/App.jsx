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
  mergeSort,
} from "./SortFunctions";
import Instruction from "./components/Instruction/Instrucion";

function App() {
  const [data, setData] = useState([1, 2, 12, 5, 9, 15, 3]);
  const [highlightNext, setHighlightNext] = useState(-1);
  const [highlightPrevious, setHighlightPrevious] = useState(-1);
  const [highlightPivot, setHighlightPivot] = useState(-1);
  const [delay, setDelay] = useState(500);
  const [locked, setLocked] = useState(false);
  const [pressedAgain, setPressedAgain] = useState(false);
  const [openInstruction, setOpenInstruction] = useState(false);
  const [time, setTime] = useState(0);

  const handleSort = (sortingName) => {
    if (!locked) {
      setLocked(!locked);
      switch (sortingName) {
        case "bubble":
          bubbleSort(
            data,
            setData,
            setHighlightNext,
            setHighlightPrevious,
            delay,
            setTime
          );

          break;
        case "selection":
          selectionSort(
            data,
            setData,
            setHighlightNext,
            setHighlightPrevious,
            delay,
            setTime
          );
          break;
        case "insertion":
          insertionSort(
            data,
            setData,
            setHighlightNext,
            setHighlightPrevious,
            delay,
            setTime
          );
          break;
        case "quick":
          quickSort(
            data,
            setData,
            setHighlightNext,
            setHighlightPrevious,
            setHighlightPivot,
            0,
            data.length - 1,
            delay,
            setTime
          );
          break;
        case "merge":
          mergeSort(
            data,
            setData,
            setHighlightNext,
            setHighlightPrevious,
            0,
            data.length - 1,
            delay,
            setTime
          );
          break;
        case "bogo":
          bogoSort(data, setData, delay, setTime);
          break;
        default:
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
          highlightNext={highlightNext}
          highlightPrevious={highlightPrevious}
          highlightPivot={highlightPivot}
          setData={setData}
          locked={locked}
          time={time}
        ></Graph>
        <SortButtons
          handleSort={handleSort}
          setDelay={setDelay}
          setData={setData}
          setLocked={setLocked}
          setPressedAgain={setPressedAgain}
          locked={locked}
        ></SortButtons>
      </main>
    </div>
  );
}

export default App;
