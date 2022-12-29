import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hamburg() {
  const navigate = useNavigate();
  const [bool, setBool] = useState({
    homeBool: true,
    booksBool: false,
    contactBool: false,
    cartBool: false,
  });
  const [newBool, setNewBool] = useState(false);
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
              textDecoration: bool.homeBool ? "underline" : "",
              color: bool.homeBool ? "#0058CC" : "",
            }}
          >
            Home
          </h1>
          <h1
            onClick={() => {
              navigate("/books");
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
              navigate("/cart");
              setNewBool(false);
            }}
            style={{
              textDecoration: bool.cartBool ? "underline" : "",
              color: bool.cartBool ? "#0058CC" : "",
            }}
          >
            My Cart
          </h1>
          <h1
            onClick={() => {
              navigate("/contact");
              setNewBool(false);
            }}
            style={{
              textDecoration: bool.contactBool ? "underline" : "",
              color: bool.contactBool ? "#0058CC" : "",
            }}
          >
            Contact Us
          </h1>
        </div>
      )}
    </div>
  );
}
