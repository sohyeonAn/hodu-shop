import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import "../css/Header.css";
function Header() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        auth.signOut();
        navigate("/");
      }
    }
  };

  return (
    <div className="header">
      <div className="header__leftSide">
        <Link to="/">
          <img
            src="images/Logo-hodu.png"
            alt="호두 로고이미지"
            className="header__logo"
          />
        </Link>

        <div className="header__search">
          <input
            type="text"
            className="header__searchInput"
            placeholder="상품을 검색해보세요!"
          />
          <img src="images/icon-search.png" className="header__searchIcon" />
        </div>
      </div>
      <nav className="header__nav header__rightSide">
        <Link to="/cart" className="header__option">
          <img
            src="images/icon-shopping-cart.svg"
            className="header__optionImage"
          />
          <span className="header__optionTitle">장바구니</span>
        </Link>
        <Link
          to={!user && "/login"}
          onClick={handleAuth}
          className="header__option"
        >
          <img src="images/icon-user.svg" className="header__optionImage" />
          <span className="header__optionTitle">
            {user ? "로그아웃" : "로그인"}
          </span>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
