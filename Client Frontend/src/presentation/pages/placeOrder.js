import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  //  const [bool, setBool] = useState(true);
  const [orderData, setOrderData] = useState({
    user: "",
    email: "",
    number: "",
    address: "",
  });
  const cartData = useSelector((state) => state.cartData);
  const newArr = cartData.map((ele) => {
    return { id: ele.id, quantity: ele.quantity };
  });

  const handleFetch = async () => {
    toast.loading("Please wait while we connect you to our payment service...");
    try {
      const res = await fetch(
        "https://us-central1-cloud-a-thon.cloudfunctions.net/httpClientStripe/placeOrder",
        //"https://us-central1-admin-mehdi-cloud.cloudfunctions.net/httpClientStripe/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: newArr,
          }),
        }
      );
      if (res.ok) {
        const output = await res.json();
        console.log(output.url);
        window.location = output.url;
      } else {
        toast.error("Some Error Occured :(");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        const failedURL = await res.json();
        Promise.reject(failedURL);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    if (
      orderData.user &&
      orderData.email &&
      orderData.number &&
      orderData.address
    ) {
      let k = JSON.stringify(cartData);

      localStorage.setItem("user", orderData.user);
      localStorage.setItem("email", orderData.email);
      localStorage.setItem("number", orderData.number);
      localStorage.setItem("address", orderData.address);
      localStorage.setItem("orderData", k);

      handleFetch();
    } else toast.error("Pls fill all inputs.");
  };

  const handleChange = (e, x) => {
    switch (x) {
      case "name":
        {
          setOrderData((prev) => {
            return { ...prev, user: e.target.value };
          });
        }
        break;
      case "email":
        {
          setOrderData((prev) => {
            return { ...prev, email: e.target.value };
          });
        }
        break;
      case "number": {
        setOrderData((prev) => {
          return { ...prev, number: e.target.value };
        });
        break;
      }
      case "address":
        {
          setOrderData((prev) => {
            return { ...prev, address: e.target.value };
          });
        }
        break;
    }
  };

  return (
    <div className="order-con">
      <Toaster />
      <div className="placeorder-title">
        <h1>
          Thank You for choosing <span>Bookstore</span> :)
        </h1>
      </div>
      <div className="placeorder-container">
        <div className="placeorder-top">
          <div className="unit">
            <h4>Your Name</h4>
            <input
              onChange={(e) => handleChange(e, "name")}
              value={orderData.name}
              placeholder="Eg: John Doe"
            />
          </div>
          <div className="unit">
            <h4>Your Email</h4>
            <input
              onChange={(e) => handleChange(e, "email")}
              value={orderData.email}
              placeholder="Eg: rainingcloud@gmail.com"
            />
          </div>
        </div>
        <div className="placeorder-bottom">
          <div className="left">
            <div className="unit">
              <h4>Your Number</h4>
              <input
                onChange={(e) => handleChange(e, "number")}
                value={orderData.number}
                type="number"
                placeholder="Eg: 9876543210"
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.15 },
                backgroundColor: "#0CAD28",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
            >
              Place Order
            </motion.button>
          </div>
          <div className="right">
            <div className="unit">
              <h4>Your Address</h4>
              <textarea
                onChange={(e) => handleChange(e, "address")}
                value={orderData.address}
                placeholder="Your current residence address..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
