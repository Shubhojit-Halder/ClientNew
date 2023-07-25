import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Announcement from "../components/Announcement";
import { Button, Title, Top, Wrapper } from "./Styles/CartStyles";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const Navigate = useNavigate();
    const[orderData,setOrderData]=useState([]);
  return (
    <>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Your Orders</Title>
        <Top>
          <Button bg="transparent" onClick={()=>Navigate("/")}>CONTINUE SHOPPING</Button>
          {/* <TopTexts> */}
            {/* <TopText>Shopping Bag(2)</TopText>
            <TopText>Wishlist(0)</TopText> */}
            {/* <TopText></TopText> */}
          {/* </TopTexts> */}
          {/* <Button bg="filled">CHECKOUT NOW</Button> */}
        </Top>
        <Bottom>
          <Info>
            {cartData.length != 0 ? (
              cartData.map((product, index) => {
                return (
                  <Product key={product._id + index}>
                    <ProductDetails>
                      <Image src={product.img} />
                      <Details>
                        <ProductBrand>{product.brand}</ProductBrand>
                        <ProductName>
                          <b>Product:</b>
                          {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b>
                          {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetails>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add
                          onClick={() => {
                            product.quantity = product.quantity + 1;
                            // dispatch(addProduct(product));
                          }}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove
                          onClick={() => {
                            console.log(index);
                            setCartData(
                              cartData
                                .slice(0, index)
                                .concat(cartData.slice(index + 1))
                            );
                            dispatch(
                              moneyReductionWhenProductRemoved(
                                cartData[index].price * cartData[index].quantity
                              )
                            );
                            dispatch(
                              removeOneProduct(
                                cartData
                                  .slice(0, index)
                                  .concat(cartData.slice(index + 1))
                              )
                            );
                          }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        Rs. {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                );
              })
            ) : (
              <Image
                style={{ width: "100%", height: "70%" }}
                src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
              />
            )}
          </Info>
        </Bottom>
      </Wrapper>
    </>
  );
};

export default Orders;
