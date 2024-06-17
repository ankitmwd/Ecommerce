import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Product from "../ProductSlider/ProductSlider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProduct } from "../../Reducers/ProductReducer.js";
import Loader from "../Loader/Loader.jsx";
const MainPageSlider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAllProduct());
  }, [dispatch]);
  const { Arr, loading } = useSelector((state) => state.ProductReducer);
  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Arr?.map(
        (items, index) =>
          index <= 7 && (
            <Product
              img={items.img}
              name={items.name}
              rs={items.price}
              rating={items.rating}
              id={items._id}
              discount={items.discount}
            ></Product>
          )
      )}
    </div>
  );
};

export default MainPageSlider;
