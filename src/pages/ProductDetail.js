import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_ENDPOINT } from "../constants";
import axios from "axios";

import "../css/ProductDetail.css";
function ProductDetail() {
  const [section, setSection] = useState(null);
  const [productInfo, setProductInfo] = useState({});

  const { productId } = useParams();
  useEffect(() => {
    axios({
      url: `${API_ENDPOINT}/products/${productId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setProductInfo(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setSection(1);
    console.log(productInfo);
  }, []);

  useEffect(() => {
    const $sectionBtns = document.querySelectorAll(
      ".product .product__tabs button"
    );

    $sectionBtns.forEach((button, index) => {
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
      <ProductInfo productInfo={productInfo} />
      <nav className="product__tabs">
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

function ProductInfo(props) {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const $plusBtn = document.querySelector(".product__info .plusBtn");
    if (amount >= props.productInfo.stock) {
      $plusBtn.disabled = true;
      alert(`재고가 ${props.productInfo.stock}개 남았습니다.`);
    } else {
      $plusBtn.disabled = false;
    }
  }, [amount]);
  return (
    <div className="product__info">
      <div className="product__imageContainer">
        <img src={props.productInfo.image} />
      </div>
      <div className="product__infoContainer">
        <div className="product__infoText">
          <span>{props.productInfo.seller_store}</span>
          <span>{props.productInfo.product_name}</span>
          <span>
            {props.productInfo.price}
            <small>원</small>
          </span>
        </div>
        <div className="product__infoBottom">
          <span className="product__delivery">
            택배배송 /{" "}
            {props.productInfo.shipping_fee === 0
              ? "무료배송"
              : `${props.productInfo.shipping_fee}원`}
          </span>
          <div className="product__amountContainer">
            <button
              type="button"
              onClick={() => {
                if (amount > 1) {
                  setAmount(amount - 1);
                } else if (!amount) {
                  setAmount(1);
                }
              }}
            >
              <img src="/images/icon-minus-line.svg" alt="뺴기" />
            </button>
            <input
              type="number"
              min="1"
              value={isNaN(amount) ? "" : `${amount}`}
              onChange={(e) =>
                e.target.value === "0"
                  ? alert("수량은 1개 이상부터 입력 가능합니다.")
                  : setAmount(parseInt(e.target.value))
              }
            />
            <button
              type="button"
              className="plusBtn"
              onClick={() => (amount ? setAmount(amount + 1) : setAmount(1))}
            >
              <img src="/images/icon-plus-line.svg" alt="더하기" />
            </button>
          </div>
          <div className="product__priceContainer">
            <span>총 상품 금액</span>
            <div className="product__priceRight">
              <span>
                총 수량 <strong>{isNaN(amount) ? 0 : `${amount}`}</strong>개
              </span>
              <span>
                {isNaN(amount) ? 0 : `${amount * props.productInfo.price}`}
                <small>원</small>
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
