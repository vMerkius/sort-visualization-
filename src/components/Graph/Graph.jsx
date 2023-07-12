import "./graph.css";

const Graph = ({ data, highlightNext, highlightPrevious }) => {
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
                  ? "green"
                  : index === highlightNext
                  ? "red"
                  : "#bb86fc",
            }}
          />
        ))}
      </div>
      <button className="shuffle-btn delay-btn">
        <i class="fas fa-random"></i>
      </button>
    </div>
  );
};

export default Graph;
