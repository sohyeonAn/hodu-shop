import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../constants";

import { useStateValue } from "../StateProvider";
import axios from "axios";
import "../css/Cart.css";

function Cart() {
  const [{ user }] = useStateValue();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios({
      url: `${API_ENDPOINT}/cart/`,
      headers: {
        Authorization: `JWT ${user.token}`,
      },
      method: "get",
    })
      .then((res) => {
        setCart(res.data.results);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

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

      {cart.length > 0 ? (
        cart.map((item) => (
          <CartList
            key={`cartItem_${item.cart_item_id}`}
            productId={item.product_id}
            quantity={item.quantity}
            cartItemId={item.cart_item_id}
          />
        ))
      ) : (
        <CartEmpty />
      )}
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
      <Link to={user ? "/order" : "/login"}>
        <button type="button" className="cart__orderButton">
          주문하기
        </button>
      </Link>
    </div>
  );

  function CartEmpty() {
    return (
      <div className="cart__emptyContainer">
        <p className="bold">장바구니에 담긴 상품이 없습니다.</p>
        <p>원하는 상품을 장바구니에 담아보세요!</p>
      </div>
    );
  }

  function CartList({ productId, quantity, cartItemId }) {
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(quantity);
    const [inputValue, setInputValue] = useState(quantity);
    const $amountInput = useRef();
    useEffect(() => {
      axios({
        url: `${API_ENDPOINT}/products/${productId}/`,
        method: "get",
      })
        .then((res) => {
          setProduct(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }, []);

    useEffect(() => {
      // // PUT /cart/<int:cart_item_id>/
      // axios({
      //   url: `${API_ENDPOINT}/cart/${cartItemId}/`,
      //   headers: {
      //     Authorization: `JWT ${user.token}`,
      //   },
      //   method: "put",
      //   data: {
      //     product_id: productId,
      //     quantity: amount,
      //     is_active: true,
      //   },
      // })
      //   .then((res) => {
      //     console.log("수량변경", res.data);
      //     setAmount(res.data.quantity);
      //   })
      //   .catch((error) => console.log(error.response.data));
    }, [amount]);

    const quantityValidation = (inputAmount) => {
      const tmpAmount = parseInt(inputAmount);
      if (amount !== tmpAmount) {
        if (tmpAmount <= product.stock) {
          if (tmpAmount >= 1) {
            setAmount(tmpAmount);
            setInputValue(tmpAmount);
          } else {
            alert("1개 이상의 수량만 입력할 수 있습니다.");
            setInputValue(1);
          }
        } else {
          alert(`주문 수량이 재고 수량을 초과했습니다. 재고:${product.stock}`);
          setInputValue(product.stock);
        }
      }
    };

    return (
      <>
        <ul className="cart__list">
          <li className="cart__itemContainer">
            <div className="cart__itemCheckContainer">
              <input type="checkbox" id="item" className="cart__itemCheck" />
              <label className="cart__itemCheckLabel" />
            </div>
            <div className="cart__itemImageContainer">
              <img src={product.image} className="cart__itemImage" />
            </div>
            <div className="cart__itemInfo">
              <span className="cart__companyName">{product.seller_store}</span>
              <span className="cart__productName">{product.product_name}</span>
              <span className="cart__price bold">{product.price} 원</span>
              <span className="cart__delivery">
                택배배송 /{" "}
                {product.shipping_fee === 0
                  ? "무료배송"
                  : `${product.shipping_fee}원`}
              </span>
            </div>
            <div className="cart__itemCountContainer">
              <button
                type="button"
                onClick={() => {
                  quantityValidation(inputValue - 1);
                }}
              >
                <img src="images/icon-minus-line.svg" />
              </button>
              <input
                type="number"
                className="cart__itemCount"
                ref={$amountInput}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onBlur={(e) => {
                  quantityValidation(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  quantityValidation(inputValue + 1);
                }}
              >
                <img src="images/icon-plus-line.svg" />
              </button>
            </div>
            <div className="cart__itemPrice">
              <span className="font-red">{quantity * product.price}원</span>
              <button type="button">주문하기</button>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default Cart;
