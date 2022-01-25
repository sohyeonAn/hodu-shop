import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";

import "../css/Join.css";
import "../css/Login.css";
import axios from "axios";

function Join() {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [phone, setPhone] = useState({ phone1: "010", phone2: "", phone3: "" });
  const [name, setName] = useState(null);
  const [email, setEmail] = useState({ email1: "", email2: "" });

  const [idChecked, setIdChecked] = useState(false);
  const [validMessage, setValidMessage] = useState({});

  useEffect(() => {
    if (id && password && rePassword && name) {
      if (phone.phone1 && phone.phone2 && phone.phone3) {
        if (email.email1 && email.email2) {
          document.querySelector(".join__submitButton").disabled = false;
        } else {
          document.querySelector(".join__submitButton").disabled = true;
        }
      }
    }
  }, [id, password, rePassword, name, phone, email]);

  const idValidation = () => {
    setIdChecked(false);

    if (id?.length === 0) {
      // 입력된 id가 없는 경우
      setValidMessage({ ...validMessage, username: "필수 정보입니다." });
    } else if (id?.length > 0) {
      // 입력된 id는 있지만
      const idReg = /^[A-Za-z0-9]{0,19}$/g;
      if (!idReg.test(id)) {
        // 형식에 맞지 않는 경우
        setValidMessage({
          ...validMessage,
          username: "20자 이내의 영문, 소문자, 대문자만 사용 가능합니다.",
        });
      } else {
        // 형식에 맞게 입력된 id인 경우
        if (validMessage.hasOwnProperty("username")) {
          const { username, ...rest } = validMessage;
          setValidMessage(rest);
        }
      }
    }
  };

  const pwdValidation = (e) => {
    const $pwdValidImg = e.target.nextSibling;
    if (password?.length === 0) {
      setValidMessage({ ...validMessage, password: "필수 정보입니다." });
      $pwdValidImg.src = "/images/icon-check-off.svg";
    } else if (password?.length > 0) {
      const pwdReg = /^[a-zA-Z0-9#?!@$%^&*-.]{8,}$/g;
      if (!pwdReg.test(password)) {
        setValidMessage({
          ...validMessage,
          password: "8자 이상 영문 대/소문자, 숫자, 특수문자를 사용하세요.",
        });
        $pwdValidImg.src = "/images/icon-check-off.svg";
      } else {
        // 형식에 맞는 pwd인 경우
        if (validMessage.hasOwnProperty("password")) {
          const { password, ...rest } = validMessage;
          setValidMessage(rest);
        }
        $pwdValidImg.src = "/images/icon-check-on.svg";
      }
    }
  };

  const rePwdValidation = (e) => {
    const $pwdValidImg = e.target.nextSibling;
    // 비밀번호가 유효한 경우에만 repwd의 유효성 검사를 진행
    if (!validMessage.hasOwnProperty("password")) {
      if (rePassword?.length > 0 && rePassword === password) {
        $pwdValidImg.src = "/images/icon-check-on.svg";
        if (validMessage.hasOwnProperty("password2")) {
          const { password2, ...rest } = validMessage;
          setValidMessage(rest);
        }
      } else {
        setValidMessage({
          ...validMessage,
          password2: "비밀번호가 일치하지 않습니다.",
        });
        $pwdValidImg.src = "/images/icon-check-off.svg";
      }
    } else {
      // 비밀번호가 유효하지 않은경우
      setValidMessage({
        ...validMessage,
        password2: "유효한 비밀번호을 입력하세요.",
      });
      $pwdValidImg.src = "/images/icon-check-off.svg";
    }
  };

  const checkDupId = () => {
    // 아이디가 형식에 맞게 입력된 경우 중복 검사 실행
    if (id && !validMessage.hasOwnProperty("username")) {
      // 중복 검사
      axios({
        url: `${API_ENDPOINT}/accounts/signup/`,
        method: "post",
        data: {
          username: id, // 아이디
          password: "",
          password2: "",
          phone_number: "", // 전화번호는 010으로 시작하는 10~11자리 숫자
          name: "", // 이름
          email: "",
        },
      })
        .then((res) => {})
        .catch((error) => {
          const idMsg = error.response.data.username;
          if (idMsg) {
            setValidMessage({ ...validMessage, username: idMsg });
          } else {
            if (validMessage.hasOwnProperty("username")) {
              const { username, ...rest } = validMessage;
              setValidMessage(rest);
            }
            setIdChecked(true);
          }
        });
    }
  };

  const handlePhoneChange = (e) => {
    const maxLengthCheck = (obj) => {
      if (obj.value.length > obj.maxLength) {
        obj.value = obj.value.slice(0, obj.maxLength);
        return obj.value;
      } else {
        return obj.value;
      }
    };

    setPhone({ ...phone, [e.target.id]: maxLengthCheck(e.target) });
  };

  const handleEmailChange = (e) => {
    setEmail({ ...email, [e.target.id]: e.target.value });
  };

  const handleSelectBox = (e) => {
    const btn = document.querySelector(".btn-select");
    if (e.target.nodeName === "BUTTON") {
      setPhone({ ...phone, phone1: e.target.innerText });
      btn.innerText = e.target.innerText;
      btn.classList.remove("on");
    }
  };

  const join = (e) => {
    console.log(
      id,
      password,
      rePassword,
      Object.values(phone).join(""),
      name,
      Object.values(email).join("@")
    );
    axios({
      url: `${API_ENDPOINT}/accounts/signup/`,
      method: "post",
      data: {
        username: id, // 아이디
        password: password,
        password2: rePassword,
        phone_number: Object.values(phone).join(""), // 전화번호는 010으로 시작하는 10~11자리 숫자
        name: name, // 이름
        email: Object.values(email).join(""),
      },
    })
      .then((res) => {
        // 회원가입 성공
        console.log(res.data);
      })
      .catch((error) => {
        // 회원가입 실패
        setValidMessage(error.response.data);
      });
  };
  return (
    <div className="join">
      <Link to="/" className="login__logo">
        <img src="images/Logo-hodu.png" />
      </Link>

      <section className="login__mainContainer">
        <div className="login__tabContainer">
          <button type="button" className="login__tab active">
            구매회원가입
          </button>
          <button type="button" className="login__tab">
            판매회원가입
          </button>
        </div>

        <form className="join__form">
          <fieldset>
            <label htmlFor="id">아이디</label>
            <div className="join__inputContainer">
              <input
                type="text"
                id="id"
                onChange={(e) => setId(e.target.value)}
                onBlur={idValidation}
              />
              <button
                type="button"
                className="join__dupButton"
                onClick={checkDupId}
              >
                중복확인
              </button>
            </div>
            {validMessage.hasOwnProperty("username") ? (
              <span className="checkMsg">{validMessage.username}</span>
            ) : id?.length > 0 && idChecked ? (
              <span className="checkMsg correct">멋진 아이디네요 :)</span>
            ) : (
              ""
            )}
            <label htmlFor="password">비밀번호</label>
            <div className="join__pwdInputContainer">
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => pwdValidation(e)}
              />
              <img
                src="images/icon-check-off.svg"
                className="join__pwdValidImg"
              />
            </div>
            {validMessage.hasOwnProperty("password") && (
              <span className="checkMsg">{validMessage.password}</span>
            )}
            <label htmlFor="rePassword">비밀번호 재확인</label>
            <div className="join__pwdInputContainer">
              <input
                type="password"
                id="rePassword"
                onChange={(e) => setRePassword(e.target.value)}
                onBlur={(e) => rePwdValidation(e)}
              />
              <img
                src="images/icon-check-off.svg"
                className="join__pwdValidImg"
              />
            </div>
            {validMessage.hasOwnProperty("password2") && (
              <span className="checkMsg">{validMessage.password2}</span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            {validMessage.hasOwnProperty("name") && (
              <span className="checkMsg">{validMessage.name}</span>
            )}
            <label htmlFor="phone">휴대전화번호</label>
            <div className="join__inputContainer">
              <article className="cont-select">
                <button
                  className="btn-select"
                  type="button"
                  onClick={(e) => e.target.classList.toggle("on")}
                >
                  010
                </button>
                <ul className="list-member" onClick={handleSelectBox}>
                  <li>
                    <button type="button">010</button>
                  </li>
                  <li>
                    <button type="button">011</button>
                  </li>
                  <li>
                    <button type="button">016</button>
                  </li>
                  <li>
                    <button type="button">017</button>
                  </li>
                  <li>
                    <button type="button">018</button>
                  </li>
                </ul>
              </article>
              <input
                type="number"
                id="phone2"
                maxLength="4"
                onChange={handlePhoneChange}
              />
              <input
                type="number"
                id="phone3"
                maxLength="4"
                onChange={handlePhoneChange}
              />
            </div>
            {validMessage.hasOwnProperty("phone_number") && (
              <span className="checkMsg">{validMessage.phone_number}</span>
            )}
            <label htmlFor="email">이메일</label>
            <div className="join__inputContainer">
              <input type="text" id="email1" onChange={handleEmailChange} />
              <span>@</span>
              <input type="text" id="email2" onChange={handleEmailChange} />
            </div>
            {validMessage.hasOwnProperty("email") && (
              <span className="checkMsg">{validMessage.email}</span>
            )}
          </fieldset>
        </form>
      </section>

      <label htmlFor="agree" className="join__term">
        <input type="checkbox" id="agree" />
        <p>
          호두샵의 <a>이용약관</a> 및 <a>개인정보처리방침</a>에 대한 내용을
          확인하였고 동의합니다.
        </p>
      </label>
      <button
        type="submit"
        className="join__submitButton"
        onClick={join}
        disabled
      >
        가입하기
      </button>
    </div>
  );
}

export default Join;
