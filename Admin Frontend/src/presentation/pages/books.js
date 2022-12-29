import { React, useState } from "react";
import Card from "../components/card";
import { PageSlider } from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/loading.svg";

export default function Books() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allData);
  const [bounds, setBounds] = useState([0, 9]);
  const newArr = data.filter((ele, index) => {
    return bounds[0] <= index && bounds[1] >= index;
  });
  const arr = newArr.map((ele) => {
    return (
      <Card
        key={ele.id}
        id={ele.id}
        url={ele.url}
        name={ele.name}
        genre={ele.genre}
        author={ele.author}
        rating={ele.rating}
        quantity={ele.quantity}
      />
    );
  });
  return (
    <>
      {data.length ? (
        <div className="books-container">
          <div className="books">{arr}</div>
          <div className="books-footer">
            <PageSlider bounds={bounds} setBounds={setBounds} />
          </div>
        </div>
      ) : (
        <img src={logo} alt="" className="books-loading" />
      )}
    </>
  );
}
