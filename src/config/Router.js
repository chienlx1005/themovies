import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../components/page/Home";
import Catalog from "../components/page/Catalog";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Detail from "../components/page//detail/Detail";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/:category/search/:keyword" element={<Catalog />} />
          <Route path="/:category/:id" element={<Detail />} />
          <Route path="/:category" element={<Catalog />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Router;
