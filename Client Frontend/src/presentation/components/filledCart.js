import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FilledCart() {
  const dispatch = useDispatch();
  let orderTotal = 0;
  const discount = 0;

  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cartData);

  const newArr = cartData.map((item) => {
    orderTotal = orderTotal + item.quantity * 500;
    return (
      <div style={{ marginTop: "1em" }} key={Math.random()}>
        <div className="filled-unit">
          <div>
            <img className="filled-img" src={item.url} />
            <h1 className="filled-book-title">{item.name}</h1>
          </div>
          <h2 className="filled-book-quantity">x{item.quantity}</h2>
          <h2 className="filled-book-price">Rs. {500}</h2>
          <h2 className="filled-book-price">Rs. {item.quantity * 500}</h2>
          {/* <svg
            onClick={() => dispatch(decre({ ...item, quantity: 1 }))}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="cross"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> */}
        </div>
      </div>
    );
  });
  // let subTotal = orderTotal - (200 + orderTotal / discount);
  return (
    <div className="all">
      <div className="filled-container">
        <div className="filled-left">
          <div className="filled-heading">
            <h1>Shopping Cart</h1>
            <h2>{newArr.length} items</h2>
          </div>
          <hr />

          <div className="filled-titles">
            <h3 className="details">PRODUCT DETAILS</h3>
            <h3>QUANTITY</h3>
            <h3>PRICE</h3>
            <h3>TOTAL</h3>
          </div>
          <div className="filled-scrollable">{newArr}</div>
        </div>
        <div className="filled-right">
          <h1>Summary</h1>
          <div>
            <h2>Total:</h2>
            <h2>Rs. {orderTotal}</h2>
          </div>
          <div>
            <h2>Discount:</h2>
            <h2>{discount}%</h2>
          </div>
          <div>
            <h2>Shipping:</h2>
            <h2>- Rs. 0</h2>
          </div>
          <div className="subtotal">
            <h2>Subtotal:</h2>
            <h2>Rs. {orderTotal}</h2>
          </div>
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.15 },
              backgroundColor: "#0CAD28",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate("/placeOrder");
            }}
          >
            Checkout Items
          </motion.button>
        </div>
      </div>
      {/* shopping wala link */}
      <div
        className="shopping-link"
        onClick={() => {
          navigate("/books");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <p>Continue Shopping</p>
      </div>
    </div>
  );
}
