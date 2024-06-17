import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { AddToCardThunk } from "../../Reducers/CardReducer";
import Cookies from "js-cookie";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const SingleProductPage = () => {
  const param = useParams();
  const id = param.id;
  const [review, SetReview] = useState();
  const [Arr, setArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("login");

  useEffect(() => {
    FetchSingleProduct();
  }, [id]);
  const FetchSingleProduct = async () => {
    try {
      setLoading(true);
      var response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/product/${id}`
      );
      setArr(response.data);
      setLoading(false);
    } catch (e) {
      toast.error(e?.message);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  const reviewAndRating = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/product/review/submit/${id}`,
        { token: token, review: review }
      );
      if (response?.data === "Already have a match") {
        setLoading(false);
        return toast.error("Already Review It");
      }
      setLoading(false);
      FetchSingleProduct();
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const setRating = (e) => {
    SetReview({ ...review, [e.target.name]: e.target.value });
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: Arr && Arr.rating,
    isHalf: true,
  };

  const AddCard = () => {
    if (!token) {
      toast.error("Login First");
    }
    dispatch(AddToCardThunk({ product_id: id, token: token }));
  };
  return (
    <>
      {Arr && (
        <div className="card-wrapper">
          <div className="card">
            {/* <!-- card left --> */}
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <img src={Arr.img[0]} alt={Arr.name} />
                </div>
              </div>
            </div>
            {/* <!-- card right --> */}
            <div className="product-content">
              <h2 className="product-title">{Arr.name}</h2>
              {/* rating  */}
              <div className="product-rating">
                {<ReactStars {...options} />}
              </div>

              <div className="product-price">
                <p className="last-price" style={{ color: "black" }}>
                  Old Price: <span>{Arr.price}</span>
                </p>
                <p className="new-price" style={{ color: "black" }}>
                  New Price :
                  <span>
                    {Math.round(Arr.price - (Arr.price / 100) * Arr.discount)}
                    <span> ({Arr.discount}%)</span>
                  </span>
                </p>
              </div>

              <div className="product-detail">
                <h2>About this item: </h2>

                <p style={{ color: "black" }}>{Arr.desc}</p>
                <ul>
                  {Arr.quantity > 0 ? (
                    <li>
                      Available: <span>in stock ({Arr.quantity})</span>
                    </li>
                  ) : (
                    <li style={{ color: "red" }}>out of stock</li>
                  )}

                  <li>
                    Shipping Area: <span>All over the world</span>
                  </li>
                  <li>
                    Shipping Fee: <span>Free</span>
                  </li>
                </ul>
              </div>

              <div className="purchase-info">
                {Arr.quantity <= 0 ? (
                  <Button backgroundColor={"red"} color={"white"}>
                    Out Of Stock
                  </Button>
                ) : (
                  <Button
                    backgroundColor={"blue"}
                    color={"white"}
                    onClick={AddCard}
                  >
                    Add To Card
                  </Button>
                )}
              </div>

              <div className="social-links">
                <p>Share At: </p>
                <a href="">
                  <IoLogoWhatsapp size={50} />
                </a>
                <a href="#">
                  <AiFillInstagram size={50} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {Arr && (
        <div>
          <section id="test">
            <div className="test-heading">
              <span>Rating && Review</span>
            </div>
            {token && (
              <form onSubmit={reviewAndRating} className="review-form">
                <div className="reviewAndRating">
                  <select
                    id="review"
                    name="rating"
                    onChange={setRating}
                    required
                    placeholder="Rating"
                  >
                    <option value="">Rating</option>
                    <option value={1}>Worst</option>
                    <option value={2}>Fair</option>
                    <option value={3}>Good</option>
                    <option value={4}>very Good</option>
                    <option value={5}>Excellent</option>
                  </select>
                </div>
                <div className="reviewAndRating">
                  <textarea
                    name="reviews"
                    onChange={setRating}
                    placeholder="Review"
                  ></textarea>
                </div>
                <input type="submit"></input>
              </form>
            )}
            <div className="test-box-container">
              {Arr.review.map((review) => (
                <div className="test-box">
                  <div className="box-top">
                    <div className="profile"></div>
                    <div className="name-user">
                      <strong>{review.userName}</strong>
                      <span>{review.userEmail}</span>
                    </div>
                    <div className="review">
                      <ReactStars
                        value={review.userRating}
                        edit={false}
                        isHalf={true}
                        activeColor={"tomato"}
                      />
                    </div>
                  </div>
                  <div className="client-comment">{review.userReview}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
