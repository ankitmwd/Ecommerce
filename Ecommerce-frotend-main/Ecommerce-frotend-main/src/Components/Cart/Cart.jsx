import React, { useEffect, useState } from "react";
import "./Cart.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { DeleteTheCard, UpdateTheCard } from "../../Reducers/CardReducer";
import { Button } from "@chakra-ui/react";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";
const Cart = ({
  img,
  price,
  neededQuantity,
  totalQuantity,
  name,
  id,
  discount,
}) => {
  const dispatch = useDispatch();
  const token = Cookies.get("login");
  const [loading, setLoading] = useState(false);
  const [required, setRequired] = useState(neededQuantity);
  const increase = () => {
    if (required + 1 <= totalQuantity) {
      setRequired(required + 1);

      dispatch(UpdateTheCard({ id: id, required: required + 1 }));
    } else {
      toast.error(`only ${required} is Available`);
    }
  };
  const decrease = () => {
    if (required - 1 >= 1) {
      setRequired(required - 1);
      dispatch(UpdateTheCard({ id: id, required: required - 1 }));
    } else {
      toast.error(`AtLeast purchase 1`);
    }
  };
  const DeleteCard = () => {
    dispatch(DeleteTheCard({ id: id }));
  };
  const BuyCard = async () => {
    setLoading(true);
    try {
      const Arr = [
        {
          card_id: id,
          name: name,
          img: img,
          price: price - (price / 100) * discount,
          quantity: required,
          token: token,
        },
      ];
      await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/user/card/payment`, {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          Arr,
        }),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then(({ url }) => {
          setLoading(false);
          window.location = url;
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e?.message);
        });
      setLoading(false);
    } catch (err) {
      toast.error(err?.message);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="shopping-cart">
      <div className="title">{name}</div>

      <div className="item">
        <div className="buttons">
          <span className="delete-btn"></span>
          <span className="like-btn"></span>
        </div>

        <div className="image">
          <img src={img} alt={name} />
        </div>

        <div className="description">
          <h5>
            Total Price :{" "}
            {Math.round(required * (price - (price / 100) * discount))}
          </h5>
          <h5>Price : {Math.round(price - (price / 100) * discount)}</h5>
        </div>

        <div className="quantity">
          <button
            className="plus-btn"
            type="button"
            name="button"
            onClick={increase}
          >
            <AiOutlinePlus
              color="red"
              style={{
                marginLeft: "6px",
              }}
            />
          </button>
          <input
            type="text"
            name="name"
            value={required}
            readOnly
            onChange={(e) => setRequired(e.target.value)}
          />
          <button
            className="minus-btn"
            type="button"
            name="button"
            onClick={decrease}
          >
            <AiOutlineMinus
              color="red"
              style={{
                marginLeft: "6px",
              }}
            />
          </button>
        </div>
        <Button backgroundColor={"red"} color={"white"} onClick={DeleteCard}>
          Delete
        </Button>
        <Button
          backgroundColor={"blue"}
          color={"white"}
          style={{
            margin: "10px",
          }}
          onClick={BuyCard}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default Cart;
