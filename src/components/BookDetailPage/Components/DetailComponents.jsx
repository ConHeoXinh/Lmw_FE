import React, { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import ReadMore from "../../../layout/ReadMore";
import usePopupStore from "../../../stores/usePopupStore";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";
import { sendRequest } from "../../../services/sendRequest";
import { BOOK_API, ORDER_API } from "../../../services/constants";
import { useNavigate } from "react-router";
import { DEFINE_ROUTES } from "../../../routes/MenuEmployee";
import useSearchStore from "../../../stores/useSearchStore";
import { Rate } from "antd";
const DetailBookComponent = ({ item, setTriggers }) => {
  const navigate = useNavigate();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const { setSearchData } = useSearchStore();

  const [like, setLike] = useState();
  useEffect(() => {
    setLike(item?.liked);
  }, [item?.liked]);
  const handleBorrow = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "PUT",
        endpoint: `${ORDER_API.ADD_TO_CARD}`,
        data: {
          bookId: item?.id,
          quantity: 1,
        },
      });
      customToast({
        type: "success",
        message: "Đã thêm vào giỏ hàng",
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
  const handleRate = async (rateValue) => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "POST",
        endpoint: `/api/rating/rate`,
        data: {
          message: "",
          stars: rateValue,
          bookId: item?.id,
        },
      });
      customToast({
        type: "success",
        message: "Đánh giá thành công",
      });
      setTriggers((prev) => !prev);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };
  const handleAddFavorite = async () => {
    try {
      handleOpenLoading();
      await sendRequest({
        method: "POST",
        endpoint: `${
          like
            ? `${BOOK_API.REMOVE_FAVORITES_BOOK}`
            : `${BOOK_API.ADD_FAVORITES_BOOK}`
        }?book-id=${item?.id}`,
      });
      customToast({
        type: "success",
        message: like
          ? "Xóa khỏi danh sách yêu thích"
          : "Đã thêm vào danh sách yêu thích",
      });
      setLike((prev) => !prev);
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
      <div className="flex flex-wrap gap-8">
        <div className="w-[30%] ml-[20px]">
          <img
            className="w-[100%] object-cover rounded-[50px]"
            src={item?.imageUrl}
            alt={item?.title}
          />
        </div>
        <div className="ml-[20px] w-[60%] flex gap-10">
          <div>
            <h2 className="font-bold text-3xl">{item?.title}</h2>
            <h3 className="text-3xl pt-[10px] pb-[15px]">{item?.subTitle}</h3>
            <p>
              Tác giả:{" "}
              {item?.authors?.map((item, index) => (
                <span
                  className="text-cyan-600 ml-[10px] cursor-pointer"
                  onClick={() =>
                    navigate(
                      `${DEFINE_ROUTES.AUTHOR_DETAIL}?authorId=${item?.id}`
                    )
                  }
                >
                  {item?.name},
                </span>
              ))}
            </p>

            <p>
              Số trang:<span className="ml-[10px]">{item?.length}</span>
            </p>
            <p>
              Ngày xuất bản:
              <span className="ml-[10px]">{item?.releaseDate}</span>
            </p>
            <p>
              Ngôn ngữ:<span className="ml-[10px]">{item?.language}</span>
            </p>
            <p>
              Nhà phát hành:
              <span
                className="text-cyan-600 ml-[10px] cursor-pointer"
                onClick={() => {
                  setSearchData({
                    publisher: item?.publisher?.name,
                  });
                  navigate("/search-book-page");
                }}
              >
                {item?.publisher?.name}
              </span>
            </p>
            <div className="flex mt-[10px]">
              <Rate value={item?.rate} disabled />
              <p className="ml-[10px]">
                {item?.ratingValue}
                <span className="text-cyan-600">
                  ({item?.totalRate || 0} Đánh giá)
                </span>
              </p>
            </div>
            <div className="flex mt-[10px]">
              <p className="mr-[10px]">Đánh giá</p>
              <Rate
                onChange={(e) => {
                  handleRate(e);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-10 mt-[20px]">
              <div>
                <div>
                  <span className="mr-[10px]">Đang được mượn:</span>
                  <span>{item?.copies}</span>
                </div>
                <div>
                  <span className="mr-[10px]">Sẵn sàng cho mượn:</span>
                  <span className="text-green-500">
                    {item?.copiesAvailabel}
                  </span>
                </div>
              </div>
              <button
                class="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-orange-200 to-red-500 text-white"
                onClick={handleBorrow}
              >
                Mượn
              </button>
            </div>
          </div>
          <div>
            {like ? (
              <HeartFilled
                onClick={handleAddFavorite}
                style={{
                  fontSize: 30,
                  color: "red",
                }}
              />
            ) : (
              <HeartOutlined
                onClick={handleAddFavorite}
                style={{
                  fontSize: 30,
                }}
              />
            )}
          </div>
        </div>
        <div className="w-[100%] mx-[20px]">
          <p className="text-center bg-gray-100 py-[15px] font-bold mb-[10px]">
            Mô tả sản phẩm Sách - {item?.title} - Tái bản mới nhất 2023, Sbooks
          </p>
          <ReadMore data={item?.description} />
        </div>
      </div>
    </>
  );
};

export default DetailBookComponent;
