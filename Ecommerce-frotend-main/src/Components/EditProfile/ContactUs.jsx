import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsBackspace } from "react-icons/bs";
const ContactUs = () => {
  const Navigate = useNavigate();
  return (
    <Box>
      <Button size={"sm"} onClick={() => Navigate("/auth")}>
        <BsBackspace />
      </Button>
      <Heading>Contact Us</Heading>
      <Box marginY={4}>
        Thank you for choosing Melvin Ecommerce. We're here to assist you and
        provide the best shopping experience possible. Please feel free to get
        in touch with us using the following contact information or by using the
        contact form below:
      </Box>
      <Heading marginY={3} size={"md"}>
        Customer Support:
      </Heading>
      <div>Email: support@melvinecommerce.com</div>
      <div>Phone: +1 (800) 123-4567</div>
      <div>Available Monday to Friday, 9:00 AM - 6:00 PM (EST)</div>
      <Heading marginY={3} size={"md"}>
        Address:
      </Heading>
      <div>Melvin Ecommerce Headquarters</div>
      <div>679 Indore Madhya Pradesh</div>
      <div>India</div>
      <h2> General Inquiries:</h2>
      <div> Email: info@melvinecommerce.com</div>
    </Box>
  );
};

export default ContactUs;
