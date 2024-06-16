import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import OrderCard from "./OrderCard";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsBackspace } from "react-icons/bs";
const Order = () => {
  const [order, setOrder] = useState(null);
  const token = Cookies.get("login");
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    FetchOrder();
  }, []);

  const FetchOrder = async () => {
    if (!token) return toast.error("Login First");
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/user/order/all/${token}`
      );
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };
  console.log(order);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button onClick={() => Navigate("/auth")}>
        <BsBackspace />
      </Button>
      {(!order || order?.length == 0) && (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            height: "60vh",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          {" "}
          No Order yet
        </h2>
      )}
      {order?.length >= 1 &&
        order?.map((val, ind) => (
          <OrderCard
            img={val.img[0]}
            name={val.name}
            price={val.price}
            required={val.quantity}
            status={val.status}
            order_date={val.order_date}
          ></OrderCard>
        ))}
    </>
  );
};

export default Order;
