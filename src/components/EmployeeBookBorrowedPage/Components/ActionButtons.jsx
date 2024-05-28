import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";
import usePopupStore from "../../../stores/usePopupStore";
import { sendRequest } from "../../../services/sendRequest";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";

const ActionButtons = ({ setTriggerReload, record }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleAcceptReturn = async () => {
    console.log('record :>> ', record);
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `/api/order/return-book/${record?.orderItemId}`,
      });
      customToast({
        type: "success",
        message: "Chấp nhận trả sách thành công",
      });
      setTriggerReload((prev) => !prev);
    } catch (err) {
      customToast({
        type: "error",
        message: getErrorMessage(err),
      });
    } finally {
      handleCloseLoading();
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-5">
        {record?.returnEd ? (
          <ButtonV2 type="danger" disable='true'>
            Đã trả
          </ButtonV2>
        ) : (
          <ButtonV2 onClick={handleAcceptReturn}>
            Chấp nhận trả
          </ButtonV2>
        )}
      </div>
    </>
  );
};

export default ActionButtons;
