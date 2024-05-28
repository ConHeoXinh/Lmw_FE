import React from "react";

const SideMain = ({ children }) => {
  return (
    <>
      <div className="w-[85%] p-[20px]">
        <div className=" bg-white h-[100%] rounded-[5px] p-[10px] overflow-auto px-[30px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default SideMain;
