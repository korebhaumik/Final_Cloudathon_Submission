import { React, useState } from "react";
import Star from "./star";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { remove } from "../../logic/actions/globalActions";
import { toast } from "react-hot-toast";

export default function Modal({
  id,
  url,
  name,
  author,
  rating,
  genre,
  setBool,
}) {
  const dispatch = useDispatch();
  let ratingArr = [];
  for (let i = 0; i < rating; i++) {
    ratingArr.push(<Star h="25" key={Math.random()} />);
  }
  const genreArr = genre.map((ele) => {
    return (
      <div key={Math.random()} className="genre">
        {ele}
      </div>
    );
  });
  return (
    <motion.div
      className="modal-container"
      initial={{ opacity: 0.5, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
    >
      <div className="modal-rel-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="cross"
          onClick={() => {
            setBool(false);
          }}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <div className="modal-content">
          <img className="modal-img" src={url} />
          {/* <img className="modal-img" src={require("../assets/book-1.png")} /> */}
          <div className="modal-right">
            <h2>{name}</h2>
            <h3>{author}</h3>
            {ratingArr}
            <h3 className="genre-title">Genre: </h3>
            <div className="modal-genres">{genreArr}</div>
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.15 },
                backgroundColor: "red",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                toast.success(`${name} removed successfully.`);
                dispatch(remove({ id }));
              }}
            >
              Remove Book
            </motion.button>
            {/* <h4>Reviews</h4> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
