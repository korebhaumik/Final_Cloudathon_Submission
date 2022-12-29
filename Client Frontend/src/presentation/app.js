import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/app.css";
import "./styles/nav.css";
import "./styles/home.css";
import "./styles/books.css";
import "./styles/cart.css";
import "./styles/contact.css";
import "./styles/modal.css";
import "./styles/hamburg.css";
import "./styles/placeOrder.css";
import "./styles/paymentSuccess.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Books from "./pages/books";
import ContactUs from "./pages/contactUs";
import Cart from "./pages/cart";
import PlaceOrder from "./pages/placeOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchData } from "../logic/actions/cartActions";
import PaymentSuccess from "./pages/paymentSuccess";

export default function App() {
  useEffect(() => {
    document.title = "The Golden Ink And Co.";
  }, []);
  const dispatch = useDispatch();
  const gBool = useSelector((state) => state.gbool);
  useEffect(() => {
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
    handleFetch();
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/placeOrder" element={<PlaceOrder />} />
        <Route exact path="/paymentSuccess" element={<PaymentSuccess />} />
        {/* <Home /> */}
      </Routes>
    </Router>
  );
}
