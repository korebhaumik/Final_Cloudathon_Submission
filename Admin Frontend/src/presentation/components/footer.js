import { React} from "react";
import { useSelector } from "react-redux";

export const PageSlider = ({ bounds, setBounds }) => {
  const data = useSelector((state) => state.allData);
  const handlePrev = () => {
    // console.log(bounds);
    if (bounds[0] - 10 >= 0) {
      setBounds([bounds[0] - 10, bounds[1] - 10]);
    }
  };
  const handleNext = () => {
    // console.log(bounds);
    if (bounds[0] + 10 < data.length) {
      setBounds([bounds[0] + 10, bounds[1] + 10]);
    }
  };

  const handleStyle = (x) => {
    switch (x) {
      case 1: {
        if (bounds[0] === 0) {
          return { color: "#0058CC", textDecoration: "underline" };
        } else {
          return {
            color: "black",
          };
        }
      }
      case 2: {
        if (bounds[0] > 1 && bounds[1] < 20) {
          return { color: "#0058CC", textDecoration: "underline" };
        } else {
          return {
            color: "black",
          };
        }
      }
      case 3: {
        if (bounds[0] > 10) {
          return { color: "#0058CC", textDecoration: "underline" };
        } else {
          return {
            color: "black",
          };
        }
      }
    }
  };

  return (
    <div className="page-slider">
      <svg
        onClick={handlePrev}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <h2 onClick={handlePrev}>Previous</h2>
      <h2 style={handleStyle(1)}>1</h2>
      <h2 style={handleStyle(2)}>2</h2>
      <h2 style={handleStyle(3)}>...</h2>
      <hr />
      <h2 onClick={handleNext}>Next</h2>
      <svg
        onClick={handleNext}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};
