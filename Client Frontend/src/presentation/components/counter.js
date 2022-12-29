import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { incre, decre } from "../../logic/actions/cartActions";

export default function Counter({ id, quantity, url, name }) {
  const dispatch = useDispatch();

  const handleIncre = () => {
    dispatch(incre({ id, quantity, url, name }));
  };
  const handleDecre = () => {
    dispatch(decre({ id, quantity, url, name }));
  };
  return (
    <div className="counter">
      <motion.svg
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
        onClick={handleDecre}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="minus"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </motion.svg>
      <h1>{quantity}</h1>
      <motion.svg
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
        onClick={handleIncre}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="plus"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </motion.svg>
    </div>
  );
}
