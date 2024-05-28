import React from "react";
import Navbar from "../components/HomePage/NavBar";
import Footer from "../components/HomePage/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-white min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
