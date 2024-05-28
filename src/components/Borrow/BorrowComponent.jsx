import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiconfig from "../../services/apiconfig";
import { ORDER_API, GET_BOOKS_BORROW } from "../../services/constants";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";
import { getErrorMessage } from "../../utils/utils";
import CustomPagination from "../../layout/Pagination";
// import InputDatePicker from "../../layout/DatePicker";
import { DATE_FORMAT, parseDatePayload, parseDateToString } from "../../utils/dateFormat";
import dayjs from "dayjs";
import moment from "moment";
import { DatePicker } from "antd";
// import InputDatePicker from "../../../layout/DatePicker";

const BorrowComponent = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [trustedData, setTrustedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [triggerReload, setTriggerReload] = useState(false);
  const [dateReturn, setDateReturn] = useState(null);

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  useLayoutEffect(() => {
    const fetchData = async () => {
      handleOpenLoading();
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: ORDER_API.GET_BOOKS_BORROW,
          params: {
            "index-page": currentPage,
          },
        });
        const trustedData = dataResponse?.data?.data?.borrowedList;
        const { content, totalElements, size } = trustedData;

        setTrustedData(
          content?.map?.((el) => ({
            ...el,
            description: el?.bookdto?.description,
            title: el?.bookdto?.title,
            imageUrl: el?.bookdto?.imageUrl,
            id: el?.bookdto?.id,
            returnDate: parseDateToString(el?.returnDate)
          }))
        );
        console.log('trustedData :>> ', trustedData);
        setTotalItems(totalElements);
        setPageSize(size);
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }
    };

    fetchData();
  }, [currentPage, triggerReload]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleExtendBook = async (item) => {
    if (dateReturn === null) {
      customToast({
        type: "error",
        message: "Hãy chọn ngày gia hạn sách",
      })
      return;
    }
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${ORDER_API.EXTEND_BOOK}`,
        data: { orderItemId: item?.orderItemId, returnDate: dateReturn },
      });

      customToast({
        type: "success",
        message: "Gia hạn thành công",
      });
      setCurrentPage(1); // Reset về trang đầu tiên sau khi xóa
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
    <div className="w-full bg-white">
      <div className="max-w-[960px] mx-auto text-white relative">
        <div className="px-4 py-8">
          <h2 className="pt-6 mt-20 text-3xl font-semibold text-center text-sky-950">
            Danh sách mượn
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {trustedData.map((item) => (
            <div key={item.orderId} className="mb-6">
              <div
                className={`flex bg-white rounded-xl shadow-2xl flex-col items-center ${hoveredIndex === item.id
                  ? "transform scale-110 transition-all duration-300"
                  : ""
                  }`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col justify-center w-full p-6 text-center">
                  <div className="w-full mx-auto mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="mx-auto max-w-[80%] sm:max-w-[180px] object-cover max-h-[180px]"
                    />
                  </div>
                  <div onClick={() => {
                    navigate(`/book-detail?id=${item?.id}`);
                  }}>
                    <h3 className="mt-4 text-xl font-bold text-black">
                      {item.title.length > 13
                        ? `${item.title.slice(0, 13) + "..."}`
                        : item.title}
                    </h3>
                  </div>

                  <p className="flex-grow mt-5 mb-4 text-lightText text-start text-slate-400">
                    {item.description.length > 40
                      ? `${item.description.slice(0, 40) + "..."}`
                      : item.description}
                  </p>
                </div>
                {item?.returnEd ? (<div>
                  <button
                    disabled="true"
                    className="px-4 py-2 font-bold text-white bg-gray-500 rounded"
                  >
                    Gia hạn
                  </button>
                </div>) : (
                  <div>
                    <button
                      onClick={() => handleExtendBook(item)}
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    >
                      Gia hạn
                    </button>
                  </div>)}
                {item?.returnEd ? (<DatePicker
                  style={{ width: "100%", height: 42 }}
                  value={dayjs(item?.returnDate, DATE_FORMAT.dateFormat)}
                  format={DATE_FORMAT.dateFormat}
                  placeholder="placeholder"
                  disabled="true"
                />) : (<DatePicker
                  style={{ width: "100%", height: 42 }}
                  value={dayjs(item?.returnDate, DATE_FORMAT.dateFormat)}
                  format={DATE_FORMAT.dateFormat}
                  placeholder="placeholder"
                  onChange={(newValue) => {
                    setTrustedData((prevData) => {
                      const updatedData = prevData.map((dataItem) => {
                        if (dataItem.id === item.id) {
                          setDateReturn(moment(newValue?.$d).format(DATE_FORMAT.dateFormatPayload));
                          return {
                            ...dataItem,
                            returnDate: moment(newValue?.$d).format("DD-MM-YYYY"),
                          };
                        }

                        return dataItem;
                      });
                      console.log(updatedData);
                      return updatedData;
                    });
                  }}
                />)}


              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-16"></div>
      <div className="flex justify-center items-center mt-[30px]">
        <div>
          <CustomPagination
            pageSize={pageSize}
            current={currentPage}
            total={totalItems}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowComponent;
