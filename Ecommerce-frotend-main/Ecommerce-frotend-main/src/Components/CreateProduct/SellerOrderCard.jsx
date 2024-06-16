import { Button, Select, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

const SellerOrderCard = ({
  name,
  img,
  price,
  required,
  status,
  order_date,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const year = order_date[0] + order_date[1] + order_date[2] + order_date[3];
  const Month = order_date[5] + order_date[6];
  const Day = order_date[8] + order_date[9];
  const [inputStatus, setInputStatus] = useState(status);
  //   const ChangeStatus = async (e) => {
  //     setLoading(true);

  //     try {
  //       const status1 = e.target.value;
  //       console.log(status1);
  //       if (status1) {
  //         setInputStatus(status1);

  //         const response = await axios.put(
  //           `${process.env.REACT_APP_ENDPOINT}/v1/user/order/status/${id}`,
  //           { status1: status1 }
  //         );
  //         setLoading(false);
  //         toast.success(response?.data);
  //       } else {
  //         return;
  //       }
  //     } catch (e) {
  //       toast.error(e?.message);
  //       setLoading(false);
  //     }
  //   };
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
          <h5>Total Price : {required * price}</h5>
          <h5>Price : {price}</h5>
          <h5>Quantity :{required}</h5>
        </div>
        <div>
          <h6> Status : {status}</h6>
          <h7>
            Order Date : {Day}/{Month}/{year}
          </h7>
          {/* <div>
            <Select marginTop={4} required onChange={ChangeStatus}>
              <option value="">Change Order Status</option>
              <option value="Shipped">Shipped</option>
              <option value="Out Of Delivery">Out Of Delivered</option>
              <option value="Delivered">Delivered</option>
              <option value="return">Return </option>
              <option value="refund">Refund </option>
            </Select>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCard;
