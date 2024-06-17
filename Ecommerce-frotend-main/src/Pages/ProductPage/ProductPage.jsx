import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./ProductPage.css";
import Product from "../../Components/ProductSlider/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProduct } from "../../Reducers/ProductReducer";
import Loader from "../../Components/Loader/Loader";
import { Heading } from "@chakra-ui/react";
const ProductPage = () => {
  const dispatch = useDispatch();
  const [MinRange, MinSetRange] = useState(0);
  const [MaxRange, MaxSetRange] = useState(Infinity);
  const [Name, SetName] = useState("");

  useEffect(() => {
    dispatch(FetchAllProduct());
  }, []);
  const { Arr, loading } = useSelector((state) => state.ProductReducer);
  if (loading) {
    return <Loader />;
  }

  const NameChange = (e) => {
    SetName(e.target.value.toLowerCase());
  };
  const MinChange = (e) => {
    MinSetRange(e.target.value);
  };
  const MaxChange = (e) => {
    MaxSetRange(e.target.value);
  };
  console.log(Arr && Arr);
  // price:
  //           val.product_id.price -
  //           (val.product_id.price / 100) * val.product_id.discount,
  return (
    <div>
      <div className="searchbar">
        <input
          placeholder="Search"
          type="text"
          onChange={NameChange}
          className="searchinput"
        />
        <div className="btndiv">
          <button className="search">
            <BsSearch size={20} />
          </button>
        </div>
      </div>
      {/* Min Max code */}

      <div class="wrapper">
        <div class="price-input">
          <div class="field">
            <span>Min</span>
            <input
              type="number"
              class="input-min"
              value={MinRange}
              onChange={MinChange}
            />
          </div>
          <div class="separator">-</div>
          <div class="field">
            <span>Max</span>
            <input
              type="number"
              class="input-max"
              value={MaxRange}
              onChange={MaxChange}
            />
          </div>
        </div>
      </div>

      <Heading
        style={{
          display: "flex",
          justifyContent: "center",
          textShadow: "0px 2px 5px rgba(0,0,0,0.8)",
        }}
      >
        Products
      </Heading>
      <div className="allproduct" style={{ display: "flex", flexWrap: "wrap" }}>
        {Arr &&
          Arr.filter((ele) => {
            return (
              (Name.toLowerCase() === ""
                ? ele
                : ele.name.toLowerCase().includes(Name)) &&
              ele.price - (ele.price / 100) * ele.discount >=
                (MinRange === "" ? 0 : MinRange) &&
              ele.price - (ele.price / 100) * ele.discount <=
                (MaxRange === "" ? Infinity : MaxRange)
            );
          }).map((ele) => (
            <Product
              key={ele.ind}
              name={ele.name}
              rs={ele.price}
              rating={ele.rating}
              img={ele.img}
              id={ele._id}
              quantity={ele.quantity}
              discount={ele.discount}
            ></Product>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
