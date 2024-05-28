import React from "react";
import useOrderHooks from "../customHook/useOrderHooks";

const QuantityButton = ({ record, setReloadData }) => {
  const { handleMinus, handlePlus } = useOrderHooks({ record, setReloadData });

  return (
    <>
      <div className="flex">
        <button className="w-5 text-center border" onClick={handleMinus}>
          -
        </button>
        <div className="w-7 text-center border">{record?.quantity}</div>
        <button className="w-5 text-center border" onClick={handlePlus}>
          +
        </button>
      </div>
    </>
  );
};

export default QuantityButton;
