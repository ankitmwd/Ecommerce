import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import SellerProfile from "./SellerProfile";
import { BsBackspace } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import Loader from "../Loader/Loader";

const Seller = ({ sellerProfile, fetchUser, setFetchUser, setOn, on }) => {
  const token = Cookies.get("login");

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ user_id: token });
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/user/seller`,
        user
      );

      setLoading(false);
      if (response?.data === "seller Profile is Created") {
        return toast.success(response?.data);
        setFetchUser(!fetchUser);
      } else {
        return toast.error(response?.data);
      }
    } catch (e) {
      toast.error(e?.message);
      setLoading(false);
    }
  };

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button onClick={() => setOn(!on)}>
        <BsBackspace />
      </Button>
      {sellerProfile && (
        <CreateProduct sellerProfile={sellerProfile} setOn={setOn} />
      )}
      {sellerProfile && <SellerProfile sellerProfile={sellerProfile} />}
      {!sellerProfile && (
        <Fragment>
          <div className="container">
            <form onSubmit={submitHandler}>
              <h1>Become A Seller</h1>
              <div className="from-group">
                <label for="">Shop/Business Name </label>
                <input
                  type="name"
                  className="form-control"
                  onChange={userChange}
                  name="shop"
                  required
                />
              </div>
              <div className="from-group">
                <label for="">Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={userChange}
                  name="address"
                  required
                />
              </div>
              <div className="from-group">
                <label for="">Pincode</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={userChange}
                  name="pincode"
                  required
                />
              </div>
              <div className="from-group">
                <label for="">Bank Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={userChange}
                  name="bankaccount"
                  required
                />
              </div>
              <input type="submit" className="btn" value="Submit" />
            </form>
          </div>
        </Fragment>
      )}
    </>
  );
};
export default Seller;
