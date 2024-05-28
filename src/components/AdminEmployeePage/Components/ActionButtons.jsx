import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";
import { sendRequest } from "../../../services/sendRequest";
import usePopupStore from "../../../stores/usePopupStore";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";

const ActionButtons = ({ record, setTriggerReload }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleChangeStatus = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `/api/admin/change-status/${record?.id}`,
      });
      customToast({
        type: "success",
        message: "Cập nhật thành công",
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
      <div className="flex items-center justify-center gap-8">
        {record?.userStatus ? (
          <ButtonV2 type="danger" onClick={handleChangeStatus}>
            Tắt
          </ButtonV2>
        ) : (
          <ButtonV2 type="success" onClick={handleChangeStatus}>
            Bật
          </ButtonV2>
        )}
      </div>
    </>
  );
};

export default ActionButtons;
