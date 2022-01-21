import React, { useState } from "react";
import "../css/Cart.css";

function Cart() {
  const [basket, setBasket] = useState(null);
  // const [basket, setBasket] = useState({});

  return (
    <div className="cart">
      <h1>장바구니</h1>
      <div className="cart__tableHeader">
        <div className="cart__itemCheckContainer">
          <input type="checkbox" id="item" className="cart__itemCheck" />
          <label className="cart__itemCheckLabel" />
        </div>
        <span></span>
        <span>상품정보</span>
        <span>수량</span>
        <span>상품금액</span>
      </div>

      {basket ? <CartList /> : <CartEmpty />}
    </div>
  );
}

export default Cart;

function CartEmpty() {
  return (
    <div className="cart__emptyContainer">
      <p className="bold">장바구니에 담긴 상품이 없습니다.</p>
      <p>원하는 상품을 장바구니에 담아보세요!</p>
    </div>
  );
}
function CartList() {
  return (
    <>
      <ul className="cart__list">
        <li className="cart__itemContainer">
          <div className="cart__itemCheckContainer">
            <input type="checkbox" id="item" className="cart__itemCheck" />
            <label className="cart__itemCheckLabel" />
          </div>
          <div className="cart__itemImageContainer">
            <img src="images/product1.png" className="cart__itemImage" />
          </div>
          <div className="cart__itemInfo">
            <span className="cart__companyName">백엔드글로벌</span>
            <span className="cart__productName">딥러닝 개발자 무릎 담요</span>
            <span className="cart__price bold">17,000 원</span>
            <span className="cart__delivery">택배배송/무료배송</span>
          </div>
          <div className="cart__itemCountContainer">
            <button type="button">
              <img src="images/icon-minus-line.svg" />
            </button>
            <input type="number" defaultValue={1} className="cart__itemCount" />
            <button type="button">
              <img src="images/icon-plus-line.svg" />
            </button>
          </div>
          <div className="cart__itemPrice">
            <span className="font-red">17,000원</span>
            <button type="button">주문하기</button>
          </div>
        </li>
      </ul>

      <div className="cart__tableBottom">
        <div className="cart__textGroup">
          <span>총 상품금액</span>
          <span>
            46,500<small>원</small>
          </span>
        </div>
        <img src="images/icon-minus-line.svg" />
        <div className="cart__textGroup">
          <span>상품 할인</span>
          <span>
            0<small>원</small>
          </span>
        </div>
        <img src="images/icon-plus-line.svg" />
        <div className="cart__textGroup">
          <span>배송비</span>
          <span>
            0<small>원</small>
          </span>
        </div>
        <div className="cart__textGroup">
          <span className="bold">결제 예정 금액</span>
          <span className="cart__lastPrice font-red">
            46,500<small>원</small>
          </span>
        </div>
      </div>

      <button type="button" className="cart__orderButton">
        주문하기
      </button>
    </>
  );
}
