import React, { useEffect } from "react";
import MainPageSlider from "../../Components/Slider/MainPageSlider";
import SlideCard from "../../Components/Offers/Offers";
import Wrapper from "../../Components/Wrapper/Wrapper";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { UserArr, login } = useSelector(
    (state) => state.AuthenticationReducer
  );
  if (login) {
  }
  return (
    <>
      <SlideCard />
      <MainPageSlider />
      <Wrapper />
    </>
  );
};

export default HomePage;
