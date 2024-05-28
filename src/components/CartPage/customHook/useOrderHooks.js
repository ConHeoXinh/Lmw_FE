import { ORDER_API } from "../../../services/constants";
import { sendRequest } from "../../../services/sendRequest";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";
import usePopupStore from "../../../stores/usePopupStore";
import { parseDatePayload } from "../../../utils/dateFormat";

const useOrderHooks = ({ record, setReloadData }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const handleDeleteCart = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "DELETE",
        endpoint: `${ORDER_API.DELETE_CART_ITEM}/${record?.id}`,
      });
      customToast({
        type: "success",
        message: "Xóa thành công",
      });
      setReloadData((prev) => !prev);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };
  const handleUpdateCartOrder = async (payloadData) => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        data: payloadData,
        endpoint: `${ORDER_API.UPDATE_CART_ITEM}/${record?.id}`,
      });
      setReloadData((prev) => !prev);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };

  const handleMinus = async () => {
    if (record?.quantity === 1) {
      await handleDeleteCart(record?.id);
    } else {
      await handleUpdateCartOrder({
        checkoutDate: parseDatePayload(record?.checkoutDate),
        returnDate: parseDatePayload(record?.returnDate),
        codeVoucher: "",
        quantity: record?.quantity - 1,
      });
    }
  };
  const handlePlus = async () => {
    await handleUpdateCartOrder({
      checkoutDate: parseDatePayload(record?.checkoutDate),
      returnDate: parseDatePayload(record?.returnDate),
      codeVoucher: "",
      quantity: record?.quantity + 1,
    });
  };
  return {
    handleMinus,
    handlePlus,
    handleDeleteCart,
    handleUpdateCartOrder,
  };
};

export default useOrderHooks;
