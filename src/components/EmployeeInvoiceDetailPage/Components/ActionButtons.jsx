import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";
import usePopupStore from "../../../stores/usePopupStore";
import { sendRequest } from "../../../services/sendRequest";
import { ORDER_API } from "../../../services/constants";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";

const ActionButtons = ({ data, setTriggerReload }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleOrder = async (type) => {
    try {
      handleOpenLoading();
      const dataResponse = await sendRequest({
        method: "PUT",
        endpoint: `${ORDER_API.ACCEPT_REJECT_ORDER}/${data?.orderId}/${type}`,
      });
      customToast({
        type: "success",
        message:
          type === "confirmed"
            ? "Chấp nhận đơn hàng thành công"
            : "Từ chối đơn hàng thành công",
      });
      setTriggerReload((prev) => !prev);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };
  return (
    <>
      <div className="flex justify-end gap-5">
        <ButtonV2 type="success" onClick={() => handleOrder("confirmed")}>
          Chấp nhận
        </ButtonV2>
        <ButtonV2 type="danger" onClick={() => handleOrder("cancel")}>
          Từ chối
        </ButtonV2>
      </div>
    </>
  );
};

export default ActionButtons;
