import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Box, Container, Text } from "@chakra-ui/react";
import Login from "../../Components/Auth/Login";
import SignUp from "../../Components/Auth/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
const Authentication = () => {
  const Navigate = useNavigate();
  const { login } = useSelector((state) => state.AuthenticationReducer);
  return (
    <>
      {login && <Profile />}
      {!login && (
        <Container maxW="80%" centerContent>
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius={"lg"}
            borderWidth={"1px"}
          >
            <Text
              fontSize={"4xl"}
              fontFamily="Work sans"
              color="black"
              textAlign="center"
            >
              Join Us
            </Text>
          </Box>
          <Box
            bg="white"
            w="100%"
            p={4}
            borderRadius={"lg"}
            borderWidth={"1px"}
            color={"black"}
          >
            <Tabs variant="soft-rounded">
              <TabList mb={"1em"}>
                <Tab width={"50%"}>Login</Tab>
                <Tab width={"50%"}>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login></Login>
                </TabPanel>
                <TabPanel>
                  <SignUp></SignUp>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Authentication;
