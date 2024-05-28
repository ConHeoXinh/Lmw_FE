import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";

const ActionButtons = ({ handleOpen, setMessagePopup, ...props }) => {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        <ButtonV2
          onClick={() => {
            setMessagePopup("Sửa danh mục thành công");
            handleOpen();
          }}
        >
          Sửa
        </ButtonV2>
      </div>
    </>
  );
};

export default ActionButtons;
