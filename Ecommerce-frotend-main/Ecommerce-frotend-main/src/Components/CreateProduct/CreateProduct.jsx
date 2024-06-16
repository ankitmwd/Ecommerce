import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Button, Heading } from "@chakra-ui/react";
import axios from "axios";
const CreateProduct = ({ sellerProfile }) => {
  const dispatch = useDispatch();
  const [on, setOn1] = useState(false);
  const name = Cookies.get("login");
  const navigation = useNavigate();
  const [Image, setImage] = useState();
  const [product, setProduct] = useState({ img: "", user_id: name });
  const [Load, setLoad] = useState(false);
  const VarSet = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product && !product.img) {
      return toast.error("Connect to Internet & Refresh The Page");
    }
    product.user_id = name;
    try {
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/v1/admin/create`,
        product
      );
      setProduct({ name: "", price: "", discount: "", desc: "", quantity: "" });
      setImage(null);
      toast.success("Product is Created");
      navigation("/");
    } catch (e) {
      toast.error(e?.message);
    }
  };
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
        product.img = res.url;
        console.log(product.img, "img url from");
      })
      .catch((e) => {
        setLoad(false);
        return toast.error(e.message);
      });
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  if (Load) {
    return <Loader />;
  }
  return (
    <>
      <Heading> Shop Name : {sellerProfile.shop}</Heading>
      <Button onClick={() => setOn1(!on)}>
        {on ? "Close" : "Create A New Product"}
      </Button>
      {on && (
        <Fragment>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <h1>Create Product</h1>
              <div className="from-group">
                <label for="">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={SetImg}
                  name="img"
                />
                {Image && (
                  <div>
                    <img src={Image} alt="No file" />
                  </div>
                )}
              </div>
              <div className="from-group">
                <label for="">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={VarSet}
                  name="name"
                  required
                  value={product && product.name}
                />
              </div>
              <div className="from-group">
                <label for="">Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={VarSet}
                  name="price"
                  required
                  value={product && product.price}
                />
              </div>
              <div className="from-group">
                <label for="">Discount On Product</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={VarSet}
                  name="discount"
                  value={product && product.discount}
                  required
                />
              </div>
              <div className="from-group">
                <label for="">Product Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={VarSet}
                  name="quantity"
                  value={product && product.quantity}
                  required
                />
              </div>
              <div className="from-group">
                <label for="">Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={VarSet}
                  name="desc"
                  value={product && product.desc}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sell" />
            </form>
          </div>
        </Fragment>
      )}
    </>
  );
};
export default CreateProduct;
