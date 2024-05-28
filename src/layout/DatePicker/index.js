import React from "react";
import { DatePicker } from "antd";

const InputDatePicker = (props) => {
  return (
    <>
      <DatePicker {...props} style={{ width: "100%", height: 42 }} />
    </>
  );
};

export default InputDatePicker;
