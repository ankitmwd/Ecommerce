import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../Assests/slide-1.png";
import img2 from "../Assests/slide-2.png";
import img3 from "../Assests/slide-3.png";
import img4 from "../Assests/slide-4.png";
import "./Offer.css";
import { useNavigate } from "react-router-dom";

const SlideCard = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const Navigate = useNavigate();
  const Sdata = [
    {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: img1,
    },
    {
      id: 2,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: img2,
    },
    {
      id: 3,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: img3,
    },
    {
      id: 4,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: img4,
    },
  ];
  return (
    <>
      <section className="homeSlide1 contentWidth1">
        <div className="container1" style={{}}>
          <Slider {...settings}>
            {Sdata.map((value, index) => {
              return (
                <>
                  <div
                    className="box1 d_flex top1"
                    key={index}
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="left1">
                      <h1>{value.title}</h1>
                      <p>{value.desc}</p>
                      <button
                        className="btn-primary1"
                        onClick={() => Navigate("/items")}
                        style={{
                          background: " #e94560",
                          padding: " 13px 40px",
                          color: " #fff",
                          borderRadius: " 5px",
                          // margin: "10px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "max-content",
                          marginTop: "30px",
                        }}
                      >
                        Visit collection
                      </button>
                    </div>
                    <div className="right1">
                      <img src={value.cover} alt="" />
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default SlideCard;
