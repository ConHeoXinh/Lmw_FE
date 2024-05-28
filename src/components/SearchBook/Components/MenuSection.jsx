import React from "react";

const MenuSection = ({ title, children, style }) => {
  return (
    <>
      <div
        className="py-[30px] w-full sm:w-[250px]"
        style={{
          border: "0.5px #c4c4cf solid",
          borderLeft: "none",
          borderRight: "none",
          ...style,
        }}
      >
        <h3 className="mb-[10px]">{title}</h3>
        <div>{children}</div>
      </div>
    </>
  );
};

export default MenuSection;
