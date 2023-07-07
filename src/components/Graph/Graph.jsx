import "./graph.css";

const Graph = ({ data, highlightIndex, highlightPrevious }) => {
  console.log(highlightIndex);

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
                  : index === highlightIndex
                  ? "red"
                  : "#bb86fc",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Graph;
