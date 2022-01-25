import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signIn = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setMessage("이메일을 입력해주세요.");
    } else if (password.length === 0) {
      setMessage("비밀번호를 입력해주세요.");
    } else {
      axios({
        url: `${API_ENDPOINT}/accounts/login/`,
        method: "post",
        data: {
          username: email,
          password: password,
          login_type: "BUYER",
        },
      })
        .then((response) => {
          const token = response.data.token;
          // TODO: 응답 받은 토큰 저장하기
          setMessage("correct!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response.data["FAIL_Message"]);
          setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
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
            type="text"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
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
