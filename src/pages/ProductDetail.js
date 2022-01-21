import React from "react";
import "../css/ProductDetail.css";
function ProductDetail() {
  return (
    <section className="product">
      <ProductInfo />
    </section>
  );
}

export default ProductDetail;

function ProductInfo() {
  return (
    <div className="product__info">
      <div className="product__imageContainer">
        <img src="images/product1.png" />
      </div>
      <div className="product__infoContainer">
        <div className="product__infoText">
          <span>백엔드글로벌</span>
          <span>딥러닝 개발자 무릎 담요</span>
          <span>
            17,500<small>원</small>
          </span>
        </div>
        <div className="product__infoBottom">
          <span className="product__delivery">택배배송 / 무료배송</span>
          <div class="product__amountContainer">
            <button type="button">
              <img src="images/icon-minus-line.svg" />
            </button>
            <input type="number" defaultValue={1} />
            <button type="button">
              <img src="images/icon-plus-line.svg" />
            </button>
          </div>
          <div className="product__priceContainer">
            <span>총 상품 금액</span>
            <div class="product__priceRight">
              <span>
                총 수량 <strong>1</strong>개
              </span>
              <span>
                17,500<small>원</small>
              </span>
            </div>
          </div>
          <div className="product__buttonContainer">
            <button type="button">바로 구매</button>
            <button type="button">장바구니</button>
          </div>
        </div>
      </div>
    </div>
  );
}
