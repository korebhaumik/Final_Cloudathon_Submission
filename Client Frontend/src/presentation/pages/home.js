import React from "react";
import { ReactComponent as HomeIllu } from "../assets/home-illu-1.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="home-container">
      <div className="home-hero">
        <div className="home-left">
          <h1>Find Your Golden Ink...</h1>
          <svg
            width="161"
            height="37"
            viewBox="0 0 161 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="line-vector"
          >
            <path
              d="M1 19.1738C109.471 -17.2172 159 19.1738 159 19.1738C159 19.1738 91.7659 -6.43428 27.6695 34"
              stroke="#EF9600"
              strokeWidth="5"
            />
          </svg>
          <p>
            The Golden Ink and Co is a brand started out by passionate reading
            enthusiasts using technology to reach as many fresh minds as
            possible and enabling people to find their taste.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: `0px 0px 10px rgba(83, 170, 252, 0.527)`,
              transition: { duration: 0.15 },
            }}
            className="home-btn"
            onClick={() => {
              navigate("/books");
            }}
          >
            Order Now
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: `0px 0px 10px rgba(83, 170, 252, 0.527)`,
              transition: { duration: 0.15 },
            }}
            className="home-btn-c"
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contact Us
          </motion.button>
        </div>
        <div className="home-right">
          <HomeIllu className="home-illu" />
        </div>
      </div>
      <div className="home-description">
        <div>
          <h1>Fast Delivery</h1>
          <p>
            The Golden Ink and Co. promises a 2 day delivery nationwide. Our
            delivery speed is as high as your excitement to receive your Golden
            Ink.
          </p>
        </div>
        <div>
          <h1>The Golden Collection</h1>
          <p>
            We offer the widest range of books and only work with select
            handpicked sellers who share a similar vision as us. So don't worry,
            you are in golden hands!
          </p>
        </div>
        <div>
          <h1>24/7 Customer Service</h1>
          <p>
            We care about our customers and love helping them by solving their
            queries. Don't hesitate to ring us up, be it for a discussion or an
            order related query.
          </p>
        </div>
      </div>
    </main>
  );
}
