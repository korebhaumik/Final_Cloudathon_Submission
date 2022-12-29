import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hamburg() {
  const navigate = useNavigate();
  const [bool, setBool] = useState({
    booksBool: false,
    ordersBool: false,
    uploadBool: false,
  });
  const [newBool, setNewBool] = useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/": {
        setBool({
          homeBool: false,
          booksBool: true,
          ordersBool: false,
          uploadBool: false,
        });
        break;
      }
      case "/orders": {
        setBool({
          homeBool: false,
          booksBool: false,
          ordersBool: true,
          uploadBool: false,
        });
        break;
      }
      case "/upload": {
        setBool({
          homeBool: false,
          booksBool: false,
          ordersBool: false,
          uploadBool: true,
        });
        break;
      }
    }
  }, [location]);
  return (
    <div className="hamburg-container">
      <svg
        onClick={() => {
          setNewBool((prev) => !prev);
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="menu-svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      {newBool && (
        <div className="dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="cross"
            onClick={() => {
              setNewBool(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <h1
            onClick={() => {
              navigate("/");
              setNewBool(false);
            }}
            style={{
              textDecoration: bool.booksBool ? "underline" : "",
              color: bool.booksBool ? "#0058CC" : "",
            }}
          >
            Books
          </h1>
          <h1
            onClick={() => {
              navigate("/orders");
              setNewBool(false);
            }}
            style={{
              textDecoration: bool.ordersBool ? "underline" : "",
              color: bool.ordersBool ? "#0058CC" : "",
            }}
          >
            Orders
          </h1>
          <h1
            onClick={() => {
              navigate("/upload");
              setNewBool(false);
            }}
            style={{
              textDecoration: bool.uploadBool ? "underline" : "",
              color: bool.uploadBool ? "#0058CC" : "",
            }}
          >
            Upload
          </h1>
          <a
            className="ham-a"
            href="https://analysispage69420-evap.onrender.com/"
          >
            Analysis
          </a>
        </div>
      )}
    </div>
  );
}
