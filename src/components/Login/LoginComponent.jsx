import React from "react";

import Login from "./Login";
import Footer from "../HomePage/Footer";
import Navbar from "../HomePage/NavBar";

const LoginComponent = () => {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginComponent;
