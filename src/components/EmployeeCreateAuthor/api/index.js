import { customToast } from "../../../customToast";
import { sendRequest } from "../../../services/sendRequest";
import { getErrorMessage } from "../../../utils/utils";

export const handleSubmitAuthor = async ({
  isDetail,
  formData,
  handleCloseLoading,
  handleOpenLoading,
  setTriggerReload,
}) => {
  handleOpenLoading();
  try {
    await sendRequest({
      endpoint: isDetail
        ? `/api/author/update?id=${formData?.id}`
        : "/api/author/insert",
      method: isDetail ? "PUT" : "POST",
      data: {
        ...formData,
      },
    });
    customToast({
      type: "success",
      message: isDetail ? "Cập nhật thành công" : "Thêm mới thành công",
    });
    isDetail && setTriggerReload((prev) => !prev);
  } catch (error) {
    customToast({
      type: "error",
      message: getErrorMessage(error),
    });
  } finally {
    handleCloseLoading();
  }
};
