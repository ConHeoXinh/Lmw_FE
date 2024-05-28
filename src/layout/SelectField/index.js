import { Select } from "antd";
import React from "react";

const SelectField = ({ label, ...props }) => {
  return (
    <div className="mb-[16px]">
      <p className="w-[100%] mb-[5px]">{label}</p>
      <Select
        size="large"
        allowClear
        style={{ width: "100%", minHeight: 39, fontSize: 14 }}
        {...props}
      />
    </div>
  );
};

export default SelectField;
