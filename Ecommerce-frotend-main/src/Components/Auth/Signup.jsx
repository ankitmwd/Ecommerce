import React, { Fragment, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../../Reducers/AuthenticationReducer";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
const Signup = () => {
  const dispatch = useDispatch();
  const [user, SetUser] = useState({ img: "" });
  const [Loading, setLoad] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserRegister(user));
  };
  const [Image, setImage] = useState();
  const SetImg = async (e) => {
    setLoad(true);
    const preset_key = process.env.REACT_APP_CLOUD_PRESET_KEY;
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;
    var file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    formData.append("cloud_name", cloud_name);
    await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoad(false);
        user.img = res.url;
        console.log(user.img, "img url from");
      })
      .catch((e) => {
        setLoad(false);
        return toast.error(e.message);
      });
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  if (Loading) {
    return <Loader />;
  }
  const userChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Fragment>
        <div className="container">
          <form onSubmit={submitHandler}>
            <h1>SIGN UP</h1>
            <div className="from-group">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={userChange}
                name="name"
                required
              />
            </div>
            <div className="from-group">
              <label for="img">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={SetImg}
                name="img"
              />
            </div>
            {Image && (
              <div>
                <img src={Image} alt="No file" />
              </div>
            )}
            <div className="from-group">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={userChange}
                name="email"
                required
              />
            </div>
            <div className="from-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={userChange}
                name="password"
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
              />
            </div>
            <div className="from-group">
              <select
                id="gender-select"
                name="gender"
                className="form-control"
                required
                onChange={userChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Trans Gender</option>
              </select>
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </Fragment>
    </>
  );
};
export default Signup;
