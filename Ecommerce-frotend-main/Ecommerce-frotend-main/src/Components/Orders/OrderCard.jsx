import React from "react";

const OrderCard = ({ img, name, required, price, status, order_date }) => {
  const year = order_date[0] + order_date[1] + order_date[2] + order_date[3];
  const Month = order_date[5] + order_date[6];
  const Day = order_date[8] + order_date[9];
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
            Order Received Date : {Day}/{Month}/{year}
          </h7>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
