import { Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { SetLogout } from "../../Reducers/AuthenticationReducer";
import { useDispatch } from "react-redux";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Seller from "../CreateProduct/Seller";
const Profile = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [Load, setLoad] = useState(false);

  const token = Cookies.get("login");
  const [userProfile, setUserProfile] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [fetchUser, setFetchUser] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    FetchUser();
  }, [fetchUser]);
  const FetchUser = async () => {
    setLoad(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/v1/user/${token}`
      );
      if (response?.data?.userProfile) {
        setUserProfile(response.data.userProfile[0]);
        if (response?.data?.sellerProfile) {
          setSellerProfile(response.data.sellerProfile[0]);
        }
      }
      setLoad(false);
    } catch (err) {
      setLoad(false);
      toast.error(err?.message);
    }
  };
  const Logout = () => {
    Cookies.remove("login");
    dispatch(SetLogout());
  };
  if (Load) {
    return <Loader />;
  }

  return (
    <>
      <div className="profileImage">
        {on && (
          <Seller
            sellerProfile={sellerProfile}
            setFetchUser={setFetchUser}
            fetchUser={fetchUser}
            setOn={setOn}
            on={on}
          />
        )}
        {userProfile && !on && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            className="ProfileAll"
            minHeight={"60vh"}
            justifyContent={"center"}
            // alignItems={"center"}
          >
            <Avatar className="box2" size={"xl"} src={userProfile.img}></Avatar>

            <Box className="box2">
              <Heading className="text1">Hey {userProfile?.name} !</Heading>
            </Box>
            <Box className="box2">
              <Button onClick={() => Navigate("/profile/order")}>Orders</Button>
            </Box>
            <Box className="box2">
              <Button onClick={() => setOn(!on)}>Seller Section</Button>
            </Box>
            <Box className="box2" onClick={() => Navigate("/profile/edit")}>
              <Button>Edit Profile</Button>
            </Box>
            <Box className="box2">
              <Button onClick={() => Navigate("/contact")}>Contact Us</Button>
            </Box>
            <Box className="box2">
              <Button onClick={Logout}>Logout</Button>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};

export default Profile;
