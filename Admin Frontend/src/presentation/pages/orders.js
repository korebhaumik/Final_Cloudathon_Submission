import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { removeOrder } from "../../logic/actions/globalActions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/loading.svg";

export default function Orders() {
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.orderData);
  const gBool = useSelector((state) => state.gBool);
  const dispatch = useDispatch();
  const handleRemove = async (id) => {
    try {
      const res = await fetch(
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpAdminFireStore/removeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      if (res.ok) {
        console.log("working!!!");
      } else {
        const failedPromise = await res.json();
        Promise.reject(failedPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveOrder = (id) => {
    toast.success(`Order No. ${id} marked as delivered.`);
    dispatch(removeOrder(id));
    handleRemove(id);
    // console.log(id);
  };
  const newArr = orderData.map((ele) => {
    const booksArr = ele.books.map((book) => {
      return (
        <div className="line" key={book.url}>
          <div className="product">
            <img src={book.url} className="order-img" />
            <h3>{book.name}</h3>
          </div>
          <h3>{book.quantity}</h3>
        </div>
      );
    });
    return (
      <div className="order-unit" key={ele.orderId}>
        <div className="left">
          <h1>
            Order Id : <span>{ele.orderId}</span>
          </h1>
          <hr />
          <div className="details">
            <h3>PRODUCT DETAILS</h3>
            <h3>QUANTITY</h3>
          </div>
          <div className="scrollable">{booksArr}</div>
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.15 },
              backgroundColor: "#0CAD28",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              handleRemoveOrder(ele.orderId);
            }}
          >
            Delivered
          </motion.button>
        </div>
        <div className="right">
          <h1>Customer Details</h1>
          <h2>{ele.user}</h2>
          <h2>{ele.email}</h2>
          <h2>{ele.number}</h2>
          <h2>{ele.address}</h2>
        </div>
      </div>
    );
  });
  return (
    <>
      {gBool ? (
        orderData.length ? (
          <div className="order-container">{newArr}</div>
        ) : (
          <div className="empty-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="empty-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <h1 className="empty-title">No orders left to deliver.</h1>
            <div
              className="empty-link"
              onClick={() => {
                navigate("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="empty-arrow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <p>Back To Store</p>
            </div>
          </div>
        )
      ) : (
        <img src={logo} alt="" className="books-loading" />
      )}
    </>
  );
}
