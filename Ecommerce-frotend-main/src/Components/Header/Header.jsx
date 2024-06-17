import React, { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SetLogin } from "../../Reducers/AuthenticationReducer";
const Header = () => {
  const token = Cookies.get("login");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(SetLogin());
    }
  }, []);
  const { login } = useSelector((state) => state.AuthenticationReducer);
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">E-Commerce</div>
      </div>
      <div className="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/items"}>Products</Link>
        <Link to={"/auth"}>{login ? "Profile" : "Login"}</Link>
        <Link to={"/cart"}>Cart</Link>
      </div>
    </div>
  );
};

export default Header;
