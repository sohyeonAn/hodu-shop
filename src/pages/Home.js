import React from "react";
import Product from "../components/Product";
import "../css/Home.css";

function Home() {
  return (
    <div className="home">
      <section className="home__sliderContainer">
        {/* {슬라이더 영역} */}
      </section>

      <section className="home__productContainer">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </section>
    </div>
  );
}

export default Home;
