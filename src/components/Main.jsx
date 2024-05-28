import React from "react";
import Footer from "../components/HomePage/Footer";
import { default as Home } from "../components/HomePage/Home";
import NavBar from "../components/HomePage/NavBar";
import New from "../components/HomePage/New";
import Trending from "../components/HomePage/Trending";
import Suggest from "../components/HomePage/Suggest";

const Main = () => {
  return (
    <>
      <NavBar />
      <Home />
      <Trending />
      <New />
      <Suggest />
      <Footer />
    </>
  );
};

export default Main;
