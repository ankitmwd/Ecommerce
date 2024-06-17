import React, { useEffect, useState } from "react";
import Cart from "../../Components/Cart/Cart.jsx";
import { BsFillBagCheckFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCard } from "../../Reducers/CardReducer.js";
import Loader from "../../Components/Loader/Loader.jsx";
import { Button, Heading } from "@chakra-ui/react";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const token = Cookies.get("login");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(GetAllCard(token));
  }, [dispatch]);
  const { CardArr } = useSelector((state) => state.CardReducer);
  if (!token) {
    return (
      <Heading
        color={"blue.600"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"60vh"}
      >
        <Link to={"/auth"}> Login </Link>
      </Heading>
    );
  }
  if (!CardArr || Loading) {
    return <Loader />;
  }
  var Total = 0;
  if (CardArr?.length > 0) {
    CardArr.forEach((val, ind) => {
      Total +=
        (val.product_id.price -
          (val.product_id.price / 100) * val.product_id.discount) *
        val.quantity;
    });
  }
  const BuyCard = async () => {
    setLoading(true);
    try {
      var Arr = [];
      if (CardArr?.length > 0) {
        await CardArr.forEach((val, ind) => {
          Arr.push({
            img: val.product_id.img,
            price:
              val.product_id.price -
              (val.product_id.price / 100) * val.product_id.discount,
            name: val.product_id.name,
            quantity: val.quantity,
            token: token,
          });
        });
      }
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
  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "crimson",
        }}
      >
        {CardArr?.length == 0 ? (
          "No Item In card"
        ) : (
          <>
            Cart <BsFillBagCheckFill style={{ marginLeft: "20px" }} />
          </>
        )}
      </h1>
      {CardArr?.length >= 1 &&
        CardArr?.map((val, ind) => (
          <Cart
            img={val.product_id.img}
            price={val.product_id.price}
            name={val.product_id.name}
            totalQuantity={val.product_id.quantity}
            neededQuantity={val.quantity}
            id={val._id}
            discount={val.product_id.discount}
          ></Cart>
        ))}
      {CardArr && CardArr?.length >= 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Total : ₹{Math.round(Total)}
          </h3>
          <Button onClick={BuyCard} color={"white"} backgroundColor={"blue"}>
            Buy
          </Button>
        </div>
      )}
    </>
  );
};

export default CartPage;
