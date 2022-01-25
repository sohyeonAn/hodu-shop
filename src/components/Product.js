import React from "react";
import "../css/Product.css";

const Product = (props) => {
  return (
    <div className="product__container">
      <div className="product__imageContainer">
        <img
          src={props.product.image}
          alt="상품이미지"
          className="product__image"
        />
      </div>
      <div className="product__detail">
        <span className="product__company">{props.product.seller_store}</span>
        <span className="product__name">{props.product.product_name}</span>
        <span className="product__price">{props.product.price}원</span>
      </div>
    </div>
  );
};

export default Product;
