import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import TableV2 from "../../layout/Tablev2";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { ORDER_API } from "../../services/constants";
import { customToast } from "../../customToast";
import { getErrorMessage } from "../../utils/utils";
import { tableCartConfig } from "./config/TableCartConfig";
import { parseDatePayload, parseDateToString } from "../../utils/dateFormat";

const CartPage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [responseData, setResponseData] = useState();
  const [reloadData, setReloadData] = useState();
  const [returnData, setReturnData] = useState();
  const [couponCode, setCouponCode] = useState("");

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = async (orderItemId) => {
    try {
      handleOpenLoading();

      const response = await sendRequest({
        method: "PUT",
        endpoint: `${ORDER_API.UPDATE_CART_ITEM}/${orderItemId}`,
        data: {
          nameVoucher: couponCode,
        },
      });
      console.log("response :>> ", response);
      if (response?.data?.success) {
        customToast({
          type: "success",
          message: "Áp dụng mã giảm giá thành công!",
        });
        setReturnData(response?.data?.updatedData);
      } else {
        customToast({
          type: "error",
          message: "Không thể áp dụng mã giảm giá. Vui lòng thử lại!",
        });
      }
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };

  useEffect(() => {
    const getListCart = async () => {
      try {
        handleOpenLoading();
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${ORDER_API.GET_CART}`,
        });
        const { cartItemDtos, totalPrice } = dataResponse?.data?.data?.cart;
        const dataVoucherResponse = dataResponse?.data?.data?.voucher;
        if (dataVoucherResponse.length > 0) {
          setCouponCode(dataResponse?.data?.data?.voucher[0].nameVoucher);
        }
        setResponseData({
          listDataCart: cartItemDtos?.map?.((el) => ({
            ...el,
            checkoutDate: parseDateToString(el?.checkoutDate || new Date()),
            returnDate: parseDateToString(el?.returnDate || new Date()),
            dateBetween:
              (new Date(el?.returnDate || new Date()).getTime() -
                new Date(el?.checkoutDate || new Date()).getTime()) /
              (1000 * 3600 * 24),
          })),
          totalPrice,
        });
        // console.log("responseData :>> ", responseData);
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }
    };
    getListCart();
  }, [reloadData]);

  const handleConfirmOrder = async () => {
    try {
      handleOpenLoading();

      await sendRequest({
        method: "POST",
        endpoint: `${ORDER_API.API_ORDER}`,
        data: {
          listOrderItem: responseData?.listDataCart?.map?.((item) => ({
            ...item,
            cartItemId: item?.cartId,
            checkoutDate: parseDatePayload(item?.checkoutDate),
            returnDate: parseDatePayload(item?.returnDate),
            codeVoucher: couponCode,
          })),
        },
      });

      customToast({
        type: "success",
        message: "Thanh toán thành công",
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

  return (
    <>
      <MainLayout>
        <div className="pt-[200px] mx-auto max-w-7xl">
          <div className="w-[100%]">
            <TableV2
              noSearchDataTable
              noPagination
              dataSource={responseData?.listDataCart}
              columns={tableCartConfig(setReloadData)}
            />
          </div>
          <div className="flex justify-end">
            <div className="mt-10">
              <div>
                <p className="mb-5">
                  Tổng tiền :{" "}
                  {responseData?.listDataCart?.reduce((acc, cur) => {
                    return acc + cur?.price;
                  }, 0)}
                  đ
                </p>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="border-2 border-gray-300 rounded-md py-2 px-4 mr-2"
                    value={couponCode}
                    disabled={true}
                    // onChange={handleCouponCodeChange}
                  />
                  {/* loi tran memory */}
                  <button
                    className="font-bold py-3 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleApplyCoupon}
                  >
                    Áp dụng
                  </button>
                </div>
                <button
                  className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-orange-200 to-red-500 text-white"
                  onClick={handleConfirmOrder}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CartPage;
