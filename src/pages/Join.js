import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../css/Join.css";
import "../css/Login.css";

function Join() {
  const [password, setPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const checkRePassword = (e) => {
    if (password.length > 0 && password === e.target.value) {
      console.log("correct!");
      setIsValidPassword(true);
    } else {
      console.log("try again");
      setIsValidPassword(false);
    }
  };

  const join = (e) => {
    const user = {};
    e.preventDefault();
    if (isAgree && isValidPassword) {
      validation();
    } else {
      alert("개인정보 동의에 체크 해 주세요");
      document.querySelector("#agree").focus();
    }

    function validation() {
      const inputs = document.getElementsByTagName("INPUT");
      for (const input of inputs) {
        if (!input.value) {
          input.focus();
          console.log(input);
          break;
        }

        if (input.id !== "agree" && input.id !== "rePassword")
          user[input.id] = input.value;
      }
    }
    console.log(user);
    // if (validation()) {
    //   auth
    //     .createUser({
    //       id: userInput.id,
    //       password: userInput.password,
    //       name: userInput.name,
    //       email: userInput.email,
    //       phoneNumber: userInput.phoneNumber,
    //     })
    //     .then((userRecord) => {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully created new user:", userRecord.uid);
    //     })
    //     .catch((error) => {
    //       console.log("Error creating new user:", error);
    //     });
    // }
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
              <input type="text" id="id" />
              <button type="button" className="join__dupButton">
                중복확인
              </button>
            </div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="rePassword">비밀번호 재확인</label>
            <input type="password" id="rePassword" onChange={checkRePassword} />
          </fieldset>
          <fieldset>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" />
            <label htmlFor="phone">휴대전화번호</label>
            <div className="join__inputContainer">
              <input type="number" id="phone1" />
              <input type="number" id="phone2" />
              <input type="number" id="phone3" />
            </div>
            <label htmlFor="email">이메일</label>
            <div className="join__inputContainer">
              <input type="text" id="email1" />
              <span>@</span>
              <input type="text" id="email2" />
            </div>
          </fieldset>
        </form>
      </section>

      <label htmlFor="agree" className="join__term">
        <input
          type="checkbox"
          id="agree"
          onClick={(e) => setIsAgree(e.target.checked)}
        />
        <p>
          호두샵의 <a>이용약관</a> 및 <a>개인정보처리방침</a>에 대한 내용을
          확인하였고 동의합니다.
        </p>
      </label>
      <button type="submit" className="join__submitButton" onClick={join}>
        가입하기
      </button>
    </div>
  );
}

export default Join;
