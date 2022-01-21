import React from "react";
import "../css/Order.css";
import "../css/DeliveryInfo.css";
import "../css/Payment.css";
import "../css/Bill.css";
function Order() {
  return (
    <div className="order">
      <h1>주문/결제하기</h1>
      <div className="order__tableHeader">
        <label>상품정보</label>
        <label>할인</label>
        <label>배송비</label>
        <label>주문금액</label>
      </div>

      <OrderList />
      <dl>
        <dt>총 주문금액</dt>
        <dd className="font-red bold">44,000원</dd>
      </dl>

      <DeliveryInfo />

      <section className="order__bottom">
        <Payment />
        <Bill />
      </section>
    </div>
  );
}

export default Order;

function OrderList() {
  return (
    <>
      <ul className="order__list">
        <li className="order__itemContainer">
          <div className="order__itemInfo">
            <div className="order__itemImageContainer">
              <img src="images/product1.png" />
            </div>
            <div className="order__itemTextGroup">
              <label className="companyName">백엔드글로벌</label>
              <label className="productName">딥러닝 개발자 무릎 담요</label>
              <label className="amount">수량 : 1개</label>
            </div>
          </div>
          <label>-</label>
          <label className="order__delivery">무료배송</label>
          <label className="bold">17,000원</label>
        </li>
      </ul>
    </>
  );
}

function DeliveryInfo() {
  return (
    <section className="delivery">
      <h2>배송정보</h2>
      <section>
        <h3>주문자 정보</h3>
        <form className="delivery__form">
          <fieldset className="delivery__from">
            <div>
              <label>이름</label>
              <input type="text" />
            </div>
            <div>
              <label>휴대폰</label>
              <div className="phone">
                <input type="number" />-
                <input type="number" className="input-short" />-
                <input type="number" className="input-short" />
              </div>
            </div>
            <div>
              <label>이메일</label>
              <input type="text" />
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <h3>배송지 정보</h3>
        <form className="delivery__form">
          <fieldset className="delivery__to">
            <div>
              <label>수령인</label>
              <input type="text" />
            </div>
            <div>
              <label>휴대폰</label>
              <div className="phone">
                <input type="number" />-
                <input type="number" className="input-short" />-
                <input type="number" className="input-short" />
              </div>
            </div>
            <div className="address">
              <label>배송주소</label>
              <input type="text" />
              <button className="delivery__searchPostBtn">우편번호 조회</button>
            </div>
            <div className="addressDetail">
              <label>상세주소</label>
              <div>
                <input tye="text" className="input-long" />
                <input tye="text" className="input-long" />
              </div>
            </div>
            <div>
              <label>배송 메시지</label>
              <input type="text" className="input-long" />
            </div>
          </fieldset>
        </form>
      </section>
    </section>
  );
}

function Payment() {
  return (
    <section className="payment">
      <h2 className="bold">결제수단</h2>
      <fieldset className="payment__method">
        <label>
          <input type="radio" name="method" />
          신용/체크카드
        </label>
        <label>
          <input type="radio" name="method" />
          무통장입금
        </label>
        <label>
          <input type="radio" name="method" />
          휴대폰 결제
        </label>
        <label>
          <input type="radio" name="method" />
          네이버페이
        </label>
        <label>
          <input type="radio" name="method" />
          카카오페이
        </label>
      </fieldset>
    </section>
  );
}

function Bill() {
  return (
    <section className="bill">
      <h2 className="bold">최종결제정보</h2>
      <div className="bill__container">
        <ul>
          <li>
            <span>상품금액</span>
            <span>
              46,000<small>원</small>
            </span>
          </li>
          <li>
            <span>할인금액</span>
            <span>
              0<small>원</small>
            </span>
          </li>
          <li>
            <span>배송비</span>
            <span>
              0<small>원</small>
            </span>
          </li>
          <li>
            <span>결제금액</span>
            <span>46,000원</span>
          </li>
        </ul>
        <div className="bill__bottom">
          <label>
            <input type="checkbox" />
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </label>
          <button type="button">결제하기</button>
        </div>
      </div>
    </section>
  );
}
