import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { API_ENDPOINT } from "../constants";
import axios from "axios";
import "../css/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios({
      url: `${API_ENDPOINT}/products/`,
      method: "get",
    })
      .then((res) => {
        setProducts(res.data.results);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  return (
    <div className="home">
      <section className="home__sliderContainer">
        {/* {슬라이더 영역} */}
      </section>

      <section className="home__productContainer">
        {products.map((product) => {
          return <Product key={product.product_id} product={product} />;
        })}
      </section>
    </div>
  );
}

export default Home;
