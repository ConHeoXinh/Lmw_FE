import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";

const ActionButtons = ({ handleOpen, setMessagePopup, ...props }) => {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        <ButtonV2
          onClick={() => {
            setMessagePopup("Return book successful");
            handleOpen();
          }}
        >
          Chấp nhận trả
        </ButtonV2>
        <ButtonV2
          type="danger"
          onClick={() => {
            setMessagePopup("Sent message successful");
            handleOpen();
          }}
        >
          Gửi tin nhắn
        </ButtonV2>
      </div>
    </>
  );
};

export default ActionButtons;
