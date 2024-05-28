import { customToast } from "../../../customToast";
import { BOOK_API } from "../../../services/constants";
import { sendRequest } from "../../../services/sendRequest";
import { getErrorMessage } from "../../../utils/utils";

export const handleCreateBook = async ({
  handleOpenLoading,
  handleCloseLoading,
  formData,
}) => {
  try {
    handleOpenLoading();
    const dataResponse = await sendRequest({
      method: "POST",
      endpoint: `${BOOK_API.EMPL_INSERT_BOOK}`,
      data: formData,
    });
    customToast({
      type: "success",
      message: "Thêm sách thành công",
    });
  } catch (error) {
    customToast({
      type: "error",
      message: getErrorMessage(error),
    });
  } finally {
    handleCloseLoading();
  }
};
export const handleUpdateBook = async ({
  handleOpenLoading,
  handleCloseLoading,
  formData,
  setTriggerReload,
}) => {
  try {
    handleOpenLoading();
    const dataResponse = await sendRequest({
      method: "PUT",
      endpoint: `${BOOK_API.EMPL_UPDATE_BOOK}?id=${formData.id}`,
      data: formData,
    });
    customToast({
      type: "success",
      message: "Lưu chỉnh sửa thành công",
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
