import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/product/:productId"
            element={
              <>
                <Header />
                <ProductDetail />
              </>
            }
          ></Route>
          <Route
            path="/order"
            element={
              <>
                <Header />
                <Order />
              </>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/join"
            element={
              <>
                <Join />
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
