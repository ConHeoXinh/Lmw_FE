import { Modal } from "antd";
import React from "react";
import ButtonV2 from "../ButtonV2";

const MessagePopup = ({ children, message, ...props }) => {
  const { open, handleCancel } = props;
  return (
    <>
      <Modal
        closeIcon={null}
        centered
        open={open}
        onCancel={handleCancel}
        footer={() => {
          return (
            <>
              <div className="w-[100%] flex justify-center">
                <ButtonV2
                  style={{
                    backgroundColor: "rgb(34 197 94)",
                  }}
                  onClick={handleCancel}
                >
                  OK
                </ButtonV2>
              </div>
            </>
          );
        }}
      >
        {children || (
          <>
            <p className="text-center font-bold text-xl my-[30px]">{message}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default MessagePopup;
