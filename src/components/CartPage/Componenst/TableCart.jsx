import React, { useEffect } from "react";
import Table from "../../../layout/Table";
import { tableCartConfig } from "../config/TableCartConfig";
import usePopupStore from "../../../stores/usePopupStore";
import { sendRequest } from "../../../services/sendRequest";
import { getErrorMessage } from "../../../utils/utils";
import { ORDER_API } from "../../../services/constants";
import { customToast } from "../../../customToast";

const TableCart = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  useEffect(() => {
    const getListCart = async () => {
      try {
        handleOpenLoading();
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${ORDER_API.GET_CART}`,
        });
        const { cartItemDtos, totalPrice } = dataResponse?.data;
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
  }, []);
  return (
    <>
      <Table
        style={{
          border: "1px black solid",
          paddingBottom: 50,
        }}
        tableConfig={tableCartConfig()}
        dataTable={[]}
        footer={
          <>
            <div className="flex lg:justify-end justify-start">
              <div className="lg:w-[15%] lg:ml-[0px] ml-[10px] w-[100%]">
                <p className="mb-[70px] mt-[50px]">Tổng tiền : 80000đ</p>
                <button
                  className="w-[120px] h-[40px] bg-[#f47920] rounded-[50px] font-bold  text-white"
                  style={{
                    border: "1px black solid",
                  }}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default TableCart;
