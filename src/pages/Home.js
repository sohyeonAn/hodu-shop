import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          return (
            <Link
              key={`goto_${product.product_id}`}
              to={`/product/${product.product_id}`}
            >
              <Product
                key={`product_${product.product_id}`}
                product={product}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default Home;
