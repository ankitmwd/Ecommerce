import React, { Fragment, useState } from "react";

import Cookies from "js-cookie";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { BsBackspace } from "react-icons/bs";
const EditProfile = () => {
  const token = Cookies.get("login");
  // const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoad] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    if (token) {
      FetchUser();
    }
  }, [token]);

  const [user, SetUser] = useState(null);
  const FetchUser = async () => {
    setLoad(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/user/${token}`
      );
      if (response?.data?.userProfile) {
        SetUser(response.data.userProfile[0]);
      }
      setLoad(false);
    } catch (err) {
      setLoad(false);
      toast.error(err?.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/v1/user/edit/profile/${token}`,
        user
      );
      if (response?.data) {
        Navigate("/auth");
      }
      setLoad(false);
    } catch (err) {
      setLoad(false);
      toast.error(err?.message);
    }
  };
  const userChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };
  if (loading) {
    return <Loader />;
  }

  console.log(user);
  return (
    <>
      {user && (
        <Fragment>
          <Button onClick={() => Navigate("/auth")}>
            <BsBackspace />
          </Button>
          <div className="container">
            <form onSubmit={submitHandler}>
              <h1>Edit Profile</h1>
              <div className="from-group">
                <label for="name">Name</label>
                <input
                  type="Name"
                  className="form-control"
                  onChange={userChange}
                  name="name"
                  value={user.name}
                  required
                />
              </div>
              <div className="from-group">
                <label for="phone">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={userChange}
                  name="phone"
                  required
                  value={user.phone}
                />
              </div>
              <div className="from-group">
                <select
                  id="gender-select"
                  name="gender"
                  className="form-control"
                  required
                  onChange={userChange}
                  value={user.gender}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Trans Gender</option>
                </select>
              </div>
              <input type="submit" className="btn" value="Edit" />
            </form>
          </div>
        </Fragment>
      )}
    </>
  );
};
export default EditProfile;
