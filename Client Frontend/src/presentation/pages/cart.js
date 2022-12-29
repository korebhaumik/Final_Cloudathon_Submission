import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilledCart from "../components/filledCart";

export default function Cart() {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  return (
    // <FilledCart />
    <>
      {cartData.length ? (
        <FilledCart />
      ) : (
        <div className="cart-container">
          <div className="empty-combine">
            <div className="empty-container">
              <h1>
                Oops Your <span>cart</span> is empty!!
              </h1>
              <p>Looks like you haven’t added anything to your cart.</p>
              <div
                className="empty-link"
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
            <img
              className="empty-illu"
              src="https://cdn.discordapp.com/attachments/1053692777470378016/1055491646785077278/Group_10.png"
            />
          </div>
        </div>
      )}
    </>
  );
}
