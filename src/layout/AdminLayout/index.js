import React from "react";
import SideBar from "./Components/SideBar";
import SideMain from "./Components/SideMain";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="w-full h-screen flex bg-[#1A2F4F]">
        <SideBar />
        <SideMain>{children}</SideMain>
      </div>
    </>
  );
};

export default AdminLayout;
