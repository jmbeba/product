import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { name } = useParams();

  return <div>{name}</div>;
};

export default Product;
