import React from "react"

import NavBar from "./Components/NavBar"
import HomePage from "./Components/HomePage";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";


function App() {
  
  return (
    <>
     <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
      </Routes>
     
    </>
  )
}

export default App
