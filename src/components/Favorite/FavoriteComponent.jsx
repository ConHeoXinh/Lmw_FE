import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePopupStore from "../../stores/usePopupStore";
import { BOOK_API, USER_FAVORITE_API } from "../../services/constants";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";
import { getErrorMessage } from "../../utils/utils";
import CustomPagination from "../../layout/Pagination";

const FavoriteComponent = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [trustedData, setTrustedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [triggerReload, setTriggerReload] = useState(false);

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  useLayoutEffect(() => {
    const fetchData = async () => {
      handleOpenLoading();
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: USER_FAVORITE_API.USER_FAVORITE,
          params: {
            "index-page": currentPage,
          },
        });
        const trustedData = dataResponse?.data?.data?.litsFavorite;
        const { content, totalElements, size } = trustedData;
        setTrustedData(
          content?.map?.((el) => ({
            ...el,
          }))
        );
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

  const handleDelete = async (id) => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "POST",
        endpoint: `${BOOK_API.REMOVE_FAVORITES_BOOK}?book-id=${id}`,
      });

      customToast({
        type: "success",
        message: "Xóa thành công",
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
            Danh sách yêu thích
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {trustedData.map((item, index) => (
            <div key={index} className="mb-6">
              <div
                className={`flex bg-white rounded-xl shadow-2xl flex-col items-center ${hoveredIndex === item.id
                  ? "transform scale-110 transition-all duration-300"
                  : ""
                  }`}
              >
                <div className="flex flex-col justify-center w-full p-6 text-center">
                  <div className="w-full mx-auto mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="mx-auto max-w-[80%] sm:max-w-[180px] object-cover max-h-[180px]"
                    />
                  </div>
                  <div onClick={() => { navigate(`/book-detail?id=${item?.bookId}`); }}>
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

                <div>
                  <button
                    onClick={() => handleDelete(item.bookId)}
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-16 "></div>
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

export default FavoriteComponent;
