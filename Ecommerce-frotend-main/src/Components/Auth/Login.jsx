import React, { Fragment, useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { UserLogin } from "../../Reducers/AuthenticationReducer";
const Login = () => {
  const [User, setUser] = useState();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(UserLogin(User));
  };
  const { UserArr, login, loading } = useSelector(
    (state) => state.AuthenticationReducer
  );
  if (loading) {
    return <Loader />;
  }

  console.log(UserArr, login);
  return (
    <>
      <Fragment>
        <div className="container">
          <form onSubmit={SubmitHandler}>
            <h1>LOGIN</h1>
            <div className="from-group">
              <label for="">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={userChange}
                name="email"
                required
              />
            </div>
            <div className="from-group">
              <label for="">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={userChange}
                name="password"
                required
              />
            </div>
            <input type="submit" className="btn" value="login" />
          </form>
        </div>
      </Fragment>
    </>
  );
};
export default Login;
