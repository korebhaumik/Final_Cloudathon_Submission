import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./styles/app.css";
import "./styles/nav.css";
import "./styles/books.css";
import "./styles/modal.css";
import "./styles/hamburg.css";
import "./styles/order.css";
import "./styles/upload.css";
import Navbar from "./components/navbar";
import Upload from "./pages/upload";
import Books from "./pages/books";
import Orders from "./pages/orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchData } from "../logic/actions/globalActions";
import { fetchOrder } from "../logic/actions/globalActions";
import { Toaster } from "react-hot-toast";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "The Golden Ink And Co.";
  }, []);
  
  const handleFetch = async () => {
    try {
      const res = await fetch(
        // "https://us-central1-admin-mehdi-cloud.cloudfunctions.net/httpClientFirestore/getBooksData"
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpClientFirestore/getBooksData"
      );
      if (res.ok) {
        const output = await res.json();
        dispatch(fetchData(output.newData));
      } else {
        const failedPromise = await res.json();
        Promise.reject(failedPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFetchOrders = async () => {
    try {
      const res = await fetch(
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpAdminFireStore/getOrders"
        // "https://us-central1-admin-mehdi-cloud.cloudfunctions.net/httpAdminFireStore/getOrders"
      );
      if (res.ok) {
        const output = await res.json();
        dispatch(fetchOrder(output.newData));
        dispatch({ type: "CHANGE_BOOL" });
      } else {
        const failedPromise = await res.json();
        Promise.reject(failedPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFetchOrders();
    handleFetch();
  }, []);
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Books />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}
