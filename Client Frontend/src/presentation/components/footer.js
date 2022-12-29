import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export const PageSlider = ({ bounds, setBounds }) => {
  const data = useSelector((state) => state.allData);
  const handlePrev = () => {
    // console.log(bounds);
    if (bounds[0] - 10 >= 0) {
      setBounds([bounds[0] - 10, bounds[1] - 10]);
    }
  };
  const handleNext = () => {
    console.log(bounds);
    console.log(data.length);
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

export const Bag = () => {
  let total = 0;
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cartData);
  cartData.forEach((item) => {
    total = total + item.quantity;
  });
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.17 },
        color: "#535D6A",
      }}
      whileTap={{ scale: 0.9 }}
      className="bag-container"
      onClick={() => {
        navigate("/cart");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
          clipRule="evenodd"
        />
      </svg>
      <div className="circle">{total}</div>
    </motion.div>
  );
};
