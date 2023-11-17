import { useState } from "react";
import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Product from "./components/Product";

function App() {

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"} style={{ margin: 10 }}>
              Home
            </Link>
            <Link to={"/about"} style={{ margin: 10 }}>
              About
            </Link>
            <button onClick={() => navigate(-1)}>
              Back
            </button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:name" element={<Product/>}/>
      </Routes>
    </>
  );
}

export default App;
