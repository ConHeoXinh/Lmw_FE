import { Pagination } from "antd";
import React from "react";

const CustomPagination = ({ ...props }) => {
  return (
    <>
      <Pagination {...props} />
    </>
  );
};

export default CustomPagination;
