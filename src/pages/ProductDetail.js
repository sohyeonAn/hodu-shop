import React, { useEffect, useState } from "react";
import "../css/ProductDetail.css";
function ProductDetail() {
  const [section, setSection] = useState(1);
  const buttons = document.querySelectorAll(".product .product__tabs button");

  useEffect(() => {
    buttons.forEach((button, index) => {
      if (index === section - 1) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }, [section]);
  function getActiveSection() {
    if (section === 1) {
      return <div>11111</div>;
    } else if (section === 2) {
      return <div>22222</div>;
    } else if (section === 3) {
      return <div>33333</div>;
    } else if (section === 4) {
      return <div>44444</div>;
    }
  }
  return (
    <section className="product">
      <ProductInfo />
      <nav class="product__tabs">
        <button type="button" onClick={(e) => setSection(1)}>
          버튼
        </button>
        <button type="button" onClick={(e) => setSection(2)}>
          리뷰
        </button>
        <button type="button" onClick={(e) => setSection(3)}>
          Q&A
        </button>
        <button type="button" onClick={(e) => setSection(4)}>
          반품/교환정보
        </button>
      </nav>
      {getActiveSection()}
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
