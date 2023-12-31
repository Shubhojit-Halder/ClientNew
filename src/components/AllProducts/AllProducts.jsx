import React, { useEffect, useState } from "react";
import SingleProduct from "../PopularProducts/SingleProduct";
import { PopularProducts } from "../PopularProducts/Data";
import styled from "styled-components";
import { mobile } from "../../Responsive";
import axios from "axios";
import LoaderComp from "../Loader";
import { publicRequest } from "../../RequestMethods";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;
  ${mobile({ marginTop: "0px" })}
`;
const AllProducts = ({ category, filters, sort }) => {
  console.log({ category, ...filters, sort });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `/product?category=${category}`
            : "/product"
        );
        // console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  // Filtering Products
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  console.log(filteredProducts);
  return (
    <Container>
      {filteredProducts.length != 0 ? (
        filteredProducts.map((data, index) => {
          return <SingleProduct data={data} key={index} />;
        })
      ) : (
        <LoaderComp />
      )}
    </Container>
  );
};

export default AllProducts;
