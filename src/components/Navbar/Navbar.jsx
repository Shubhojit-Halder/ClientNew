import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, MenuItem } from "@mui/material";
import {
  CloseRounded,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { mobile } from "../../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginReq } from "../../loginApiCalls";
import { logout } from "../../ReduxStore/userSlice";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  addProduct,
  removeAllProducts,
  setProduct,
} from "../../ReduxStore/cartSlice";
import { publicRequest } from "../../RequestMethods";
const Container = styled.div`
  height: 60px;
  z-index: 10;
  width: 100vw;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px #88888848;
  position: fixed;
  /* margin-top: 30px; */
  ${mobile({
    // display: "none",
    height: "50px",
    padding: "0px 10px 15px 10px",
  })}/* background-color: black; */
`;

const Wrapper = styled.div`
  position: fixed;
  padding: 10px 15px;
  
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  .mobile-only{
      display: none;
    }
  @media(max-width:420px) {
    .menuitem {
      display: none;
      color: #fff;
    }
    .mobile-only{
      display: flex;
    }
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  /* border: 0.5px solid #d8d8d8; */
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 10px;
  background-color: #bdbdbd2a;
  width: 280px;
  height: 20px;
  ${mobile({ width: "100%" })}
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 3px 3px;
  background-color: #e6e6e62a;
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  ${mobile({ flex: 0.5 })}/* justify-content: center; */
  /* text-align: center; */
`;
export const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
  ${mobile({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  ${mobile({ flex: 1.5 })}/* justify-content: center; */

`;
const MobileNav = styled.div`
  background-color: #ffffff;
  height: 50vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 4;
  margin-top: 50px;
`
;
const Navbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      if (cartItems.quantity) {
        const res = await publicRequest.post(`/cart`, {
          userId: user._id,
          products: cartItems.product,
          quantity: cartItems.quantity,
          price: cartItems.price,
          token: user.accessToken,
        });
        console.log(res.data);
      }
      dispatch(logout());
      dispatch(removeAllProducts());
      console.log("bye");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Center>
            <Logo>HALDER'S</Logo>
            <Link
              to="/products/man"
              style={{
                textDecoration: "none",
                color: "initial",
                fontWeight: 500,
              }}
            >
              <MenuItem style={{ marginLeft: "20px" }} className="menuitem">
                MEN
              </MenuItem>
            </Link>
            <Link
              to="/products/woman"
              style={{
                textDecoration: "none",
                color: "initial",
                fontWeight: 500,
              }}
            >
              <MenuItem style={{ marginLeft: "20px" }} className="menuitem">
                WOMEN
              </MenuItem>
            </Link>
            <MenuItem style={{ marginLeft: "20px" }} className="menuitem">
              KIDS
            </MenuItem>
          </Center>
          <Right>
            <Left>
              <SearchContainer>
                <Input placeholder="Search for brands, products and more" />
                <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
              </SearchContainer>
            </Left>
            {user ? (
              <MenuItem
                className="menuitem"
                sx={{
                  margin: "0px 10px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#b0b0b063",
                }}
              >
                {user.username.toUpperCase().slice(0, 1)}
              </MenuItem>
            ) : (
              <MenuItem className="menuitem">Register</MenuItem>
            )}
            {user ? (
              <MenuItem className="menuitem" onClick={handleLogout}>
                Logout
              </MenuItem>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem className="menuitem">Login</MenuItem>
              </Link>
            )}

            <Link to="/cart">
              <MenuItem sx={{ color: "#000" }}>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
            {isOpen ? (
              <MenuItem
                sx={{
                  color: "#000",
                  // marginLeft: "-15px",
                  transition: "5s linear",
                }}
                onClick={() => setIsOpen(false)}
                className="mobile-only"
              >
                <CloseRounded />
              </MenuItem>
            ) : (
              <MenuItem
                className="mobile-only"
                sx={{
                  // marginTop:"0px",
                  color: "#000",
                  marginLeft: "-15px",
                  // marginBottom:"-20px",
                  transition: "5s linear",
                }}
                onClick={() => setIsOpen(true)}
              >
                <MenuRoundedIcon />
              </MenuItem>
            )}
          </Right>
        </Wrapper>
      </Container>

      {isOpen && (
        <MobileNav>
          <Link
            to="/products/man"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: 500,
            }}
          >
            <MenuItem
              style={{
                marginLeft: "20px",
                fontSize: "20px",
                marginBottom: "20px",
              }}
              className="menuitem"
            >
              MEN
            </MenuItem>
          </Link>
          <Link
            to="/products/woman"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: 500,
            }}
          >
            <MenuItem
              style={{
                marginLeft: "20px",
                fontSize: "20px",
                marginBottom: "20px",
              }}
              className="menuitem"
            >
              WOMEN
            </MenuItem>
          </Link>
          <Link
            to="/products/kids"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: 500,
            }}
          >
            <MenuItem
              style={{
                marginLeft: "20px",
                fontSize: "20px",
                marginBottom: "20px",
              }}
              className="menuitem"
            >
              KIDS
            </MenuItem>
          </Link>
        </MobileNav>
      )}
    </>
  );
};

export default Navbar;
