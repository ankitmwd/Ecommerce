import React from "react";
import "./ProductSlider.css";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AddToCardThunk } from "../../Reducers/CardReducer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Product = ({ img, rs, name, rating, quantity, id, discount }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: rating,
    isHalf: true,
  };
  const token = Cookies.get("login");
  const AddToCard = () => {
    if (!token) return toast.error("Login First");
    else {
      const data = {
        product_id: id,
        token: token,
      };
      dispatch(AddToCardThunk(data));
    }
  };
  return (
    <>
      <div className="gallery">
        <div className="content">
          <img
            src={img}
            alt={name}
            onClick={() => Navigate(`/product/${id}`)}
          />
          <h3 onClick={() => Navigate(`/product/${id}`)}>{name}</h3>
          <p>
            <ReactStars {...options} />
          </p>
          <h6>₹{Math.round(rs - (rs / 100) * discount)}</h6>
          {quantity <= 0 ? (
            <button className="buy-1" style={{ color: "red" }}>
              Out of Stock
            </button>
          ) : (
            <button onClick={AddToCard} className="buy-1">
              Add to card
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
