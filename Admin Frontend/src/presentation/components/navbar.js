import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Hamburg from "./hamburg";

export default function Navbar() {
  const [bool, setBool] = useState({
    homeBool: true,
    booksBool: false,
    ordersBool: false,
    uploadBool: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/": {
        setBool({
          homeBool: false,
          booksBool: true,
          uploadBool: false,
          ordersBool: false,
        });
        break;
      }
      case "/upload": {
        setBool({
          homeBool: false,
          booksBool: false,
          uploadBool: true,
          ordersBool: false,
        });
        break;
      }
      case "/orders": {
        setBool({
          homeBool: false,
          booksBool: false,
          uploadBool: false,
          ordersBool: true,
        });
        break;
      }
    }
  }, [location]);

  return (
    <header>
      <h1 className="logo">The Golden Ink</h1>
      <Hamburg />
      <nav className="nav-right">
        <motion.span
          onTap={() => {
            !bool.booksBool && navigate("/");
          }}
          style={{
            color: bool.booksBool ? "#0058CC" : "",
          }}
        >
          Books
        </motion.span>
        <motion.span
          onTap={() => {
            !bool.ordersBool && navigate("/orders");
          }}
          style={{
            color: bool.ordersBool ? "#0058CC" : "",
          }}
        >
          Orders
        </motion.span>
        <motion.span
          onTap={() => {
            !bool.uploadBool && navigate("/upload");
          }}
          style={{
            color: bool.uploadBool ? "#0058CC" : "",
          }}
        >
          Upload
        </motion.span>
        <a
          className="nav-a"
          href="https://analysispage69420-evap.onrender.com/"
        >
          Analysis
        </a>
      </nav>
    </header>
  );
}
