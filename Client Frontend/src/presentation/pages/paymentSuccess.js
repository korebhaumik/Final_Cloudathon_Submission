import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const number = localStorage.getItem("number");
  const address = localStorage.getItem("address");
  const orderDataRaw = localStorage.getItem("orderData");
  const obj = JSON.parse(orderDataRaw);

  const handleFetch = async () => {
    try {
      const res = await fetch(
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpClientMail/postMail",
        //"https://us-central1-cloud-a-thon.cloudfunctions.net/httpClientMail/getBooksData"

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            user,
            address,
          }),
        }
      );
      if (res.ok) {
        // localStorage.clear();
        console.log("working!!!");
      } else {
        const failedPromise = await res.json();
        Promise.reject(failedPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleOrder = async () => {
    try {
      const res = await fetch(
        //"https://us-central1-admin-mehdi-cloud.cloudfunctions.net/httpClientFirestore/addOrder",
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpClientFirestore/addOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            user,
            number,
            address,
            orderData: obj,
          }),
        }
      );
      if (res.ok) {
        localStorage.clear();
        console.log("working!!!");
      } else {
        const failedPromise = await res.json();
        Promise.reject(failedPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(obj);
    handleFetch();
    handleOrder();
  }, []);

  return (
    <div className="payment-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="tickmark"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <h1>Payment Successful</h1>
      <h2>Check your email for further details.</h2>
      <div
        className="gohome-link"
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
          className="arrow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <p>Back to Home</p>
      </div>
    </div>
  );
}
