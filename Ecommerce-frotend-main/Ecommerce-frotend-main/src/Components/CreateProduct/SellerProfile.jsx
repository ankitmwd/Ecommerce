import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SellerOrderCard from "./SellerOrderCard";
import Loader from "../Loader/Loader";

const SellerProfile = ({ sellerProfile }) => {
  const token = Cookies.get("login");
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    FetchOrder();
  }, []);
  const FetchOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/product/admin/orders/${token}`
      );
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  if (loading) {
    return <Loader />;
  }
  console.log(order && order);
  return (
    <Box>
      {order &&
        sellerProfile &&
        order.length > 0 &&
        order?.map((val, ind) => (
          <SellerOrderCard
            order_date={val.order_date}
            status={val.status}
            price={val.price}
            required={val.quantity}
            name={val.name}
            img={val.img[0]}
            id={val._id}
            key={val._id}
          ></SellerOrderCard>
        ))}
    </Box>
  );
};

export default SellerProfile;
