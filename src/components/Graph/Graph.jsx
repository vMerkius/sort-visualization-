import "./graph.css";

const Graph = ({
  data,
  highlightNext,
  highlightPrevious,
  highlightPivot,
  setData,
  locked,
  time,
}) => {
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleShuffle = () => {
    if (!locked) {
      const newData = shuffle([...data]);
      setData(newData);
    }
  };
  return (
    <div className="graph-container">
      <div className="graph">
        {data.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value * 10}px`,
              width: "10px",
              backgroundColor:
                index === highlightPrevious
                  ? "#28a428"
                  : index === highlightNext
                  ? "#ff4d4d"
                  : index === highlightPivot
                  ? "#004d99"
                  : "#bb86fc",
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          handleShuffle();
        }}
        className="shuffle-btn delay-btn"
      >
        <i className="fas fa-random"></i>
      </button>
      {time !== 0 && !isNaN(time) && <h3 className="time">{time / 1000}s</h3>}
    </div>
  );
};

export default Graph;
