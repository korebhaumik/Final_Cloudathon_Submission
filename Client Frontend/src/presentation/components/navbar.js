import { React, useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Hamburg from "./hamburg";

export default function Navbar() {
  const [bool, setBool] = useState({
    homeBool: true,
    booksBool: false,
    contactBool: false,
    cartBool: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/": {
        setBool({
          homeBool: true,
          booksBool: false,
          contactBool: false,
          cartBool: false,
        });
        break;
      }
      case "/books": {
        setBool({
          homeBool: false,
          booksBool: true,
          contactBool: false,
          cartBool: false,
        });
        break;
      }
      case "/contact": {
        setBool({
          homeBool: false,
          booksBool: false,
          contactBool: true,
          cartBool: false,
        });
        break;
      }
      case "/cart": {
        setBool({
          homeBool: false,
          booksBool: false,
          contactBool: false,
          cartBool: true,
        });
        break;
      }
    }
  }, [location]);

  return (
    <header>
      <div className="logo">
        {/* <img src={require("../assets/logo.png")} /> */}
        <h1>The Golden Ink</h1>
      </div>
      <Hamburg />
      <nav className="nav-right">
        <motion.span
          onTap={() => {
            !bool.homeBool && navigate("/");
          }}
          style={{
            // textDecoration: bool.homeBool ? "underline" : "",
            color: bool.homeBool ? "#0058CC" : "",
          }}
        >
          Home
        </motion.span>
        <motion.span
          onTap={() => {
            !bool.booksBool && navigate("/books");
          }}
          style={{
            // textDecoration: bool.booksBool ? "underline" : "",
            color: bool.booksBool ? "#0058CC" : "",
          }}
        >
          Books
        </motion.span>
        <motion.span
          onTap={() => {
            !bool.cartBool && navigate("/cart");
          }}
          style={{
            // textDecoration: bool.cartBool ? "underline" : "",
            color: bool.cartBool ? "#0058CC" : "",
          }}
        >
          My Cart
        </motion.span>
        <motion.span
          onTap={() => {
            !bool.contactBool && navigate("/contact");
          }}
          style={{
            // textDecoration: bool.contactBool ? "underline" : "",
            color: bool.contactBool ? "#0058CC" : "",
          }}
        >
          Contact Us
        </motion.span>
      </nav>
    </header>
  );
}
