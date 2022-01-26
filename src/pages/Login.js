import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { API_ENDPOINT } from "../constants";

import "../css/Login.css";
import axios from "axios";

function Login() {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signIn = (e) => {
    e.preventDefault();
    const $idInput = document.querySelector(".login__form #id");
    const $pwdInput = document.querySelector(".login__form #password");

    if (id.length === 0) {
      $idInput.focus();
      setMessage("아이디를 입력해주세요.");
    } else if (password.length === 0) {
      $pwdInput.focus();
      setMessage("비밀번호를 입력해주세요.");
    } else {
      axios({
        url: `${API_ENDPOINT}/accounts/login/`,
        method: "post",
        data: {
          username: id,
          password: password,
          login_type: "BUYER",
        },
      })
        .then((response) => {
          const loginUser = response.data;
          dispatch({
            type: "SET_USER",
            user: loginUser,
          });
          navigate(-1);
        })
        .catch((error) => {
          console.log(error.response.data["FAIL_Message"]);
          setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
          $pwdInput.focus();
          $pwdInput.value = "";
        });
    }
  };
  return (
    <div className="login">
      <Link to="/" className="login__logo">
        <img src="images/Logo-hodu.png" />
      </Link>

      <section className="login__mainContainer">
        <div className="login__tabContainer">
          <button type="button" className="login__tab active">
            구매회원 로그인
          </button>
          <button type="button" className="login__tab">
            판매회원 로그인
          </button>
        </div>

        <form className="login__form">
          <input
            id="id"
            type="text"
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <span className="login__message">{message}</span>}
          <button
            type="submit"
            className="login__submitButton"
            onClick={signIn}
          >
            로그인
          </button>
        </form>
      </section>

      <div className="login__findContainer">
        <Link to="/join">회원가입</Link>
        <a>비밀번호 찾기</a>
      </div>
    </div>
  );
}

export default Login;
