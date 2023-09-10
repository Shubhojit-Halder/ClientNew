import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAllProducts } from "../ReduxStore/cartSlice";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement";
import { Button } from "@mui/material";
const Success = () => {
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(removeAllProducts());
  }, []);
  return (
    <>
      <Announcement />
      <Navbar />
      <div
        width="100vw"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column",
          height: "90vh",
        }}
      >
        <img
          style={{ height: "400px", width: "400px", objectFit: "contain" }}
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-53afd.appspot.com/o/orderSuccess.png?alt=media&token=d06ec779-6fb0-42ed-8ba1-592fd201acfe"
          alt="Product Img"
        />
        <Button variant="contained" sx={{bgcolor:"teal",':hover':{bgcolor:"teal"}}}>Go To Orders</Button>
      </div>
    </>
  );
};

export default Success;
