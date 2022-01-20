import React from "react";
import "../css/Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__topContainer">
        <ul className="footer__termContainer">
          <li>
            <a>호두샵 소개</a>
          </li>
          <li>
            <a>이용약관</a>
          </li>
          <li>
            <a className="bold">개인정보처리방침</a>
          </li>
          <li>
            <a>청소년보호정책</a>
          </li>
          <li>
            <a>제품문의</a>
          </li>
        </ul>
        <ul className="footer__snsContainer">
          <li>
            <a>
              <img src="images/icon-insta.svg" alt="인스타그램 바로가기" />
            </a>
          </li>
          <li>
            <a>
              <img src="images/icon-fb.svg" alt="페이스북 바로가기" />
            </a>
          </li>
          <li>
            <a>
              <img src="images/icon-yt.svg" alt="유튜브 바로가기" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__bottomContainer">
        <small className="bold">(주)HODU SHOP</small>
        <small>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</small>
        <small>사업자 번호 : 000-0000-000 | 통신판매업</small>
        <small>대표 : 김호두</small>
      </div>
    </footer>
  );
}

export default Footer;
