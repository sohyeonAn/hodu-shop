import React from "react";
import "../css/Product.css";

const Product = () => {
  return (
    <div className="product__container">
      <img
        src="images/product1.png"
        alt="상품이미지"
        className="product__image"
      />
      <div className="product__detail">
        <span className="product__company">우당탕탕 라이캣의 실험실</span>
        <span className="product__name">
          Hack Your Life 개발자 노트북 파우치
        </span>
        <span className="product__price">29,000원</span>
      </div>
    </div>
  );
};

export default Product;
