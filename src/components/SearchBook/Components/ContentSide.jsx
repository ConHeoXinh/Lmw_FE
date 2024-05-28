import React, { useEffect, useState } from "react";
import Section from "../../../layout/Section";
import { BookCardV2 } from "../../BookCard";
import CustomPagination from "../../../layout/Pagination";
import usePopupStore from "../../../stores/usePopupStore";
import { sendRequest } from "../../../services/sendRequest";
import { BOOK_API } from "../../../services/constants";
import { customToast } from "../../../customToast";
import { getErrorMessage } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import useSearchStore from "../../../stores/useSearchStore";

const ContentSide = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const navigate = useNavigate();
  const [dataBook, setDataBook] = useState();
  const [indexPage, setIndexPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { searchData } = useSearchStore();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        handleOpenLoading();
        const dataResponse = await sendRequest({
          method: "POST",
          endpoint: `${BOOK_API.LIST_SEARCH_BOOK}?index-page=${indexPage}`,
          data: searchData,
        });
        const { content, size, totalElements, page } =
          dataResponse?.data?.data?.searchList;
        setIndexPage(page);
        setDataBook(content);
        setPageSize(size);
        setTotalItems(totalElements);
      } catch (error) {
        customToast({ type: "error", message: getErrorMessage(error) });
        setIndexPage(1);
        setDataBook([]);
        setPageSize(0);
        setTotalItems(0);
      } finally {
        handleCloseLoading();
      }
    };
    fetchBookData();
  }, [indexPage, JSON.stringify(searchData)]);
  return (
    <>
      <Section title="Tìm kiếm sách">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {dataBook?.map((item) => (
            <BookCardV2
              item={item}
              handleTitleOnClick={() => {
                navigate(`/book-detail?id=${item?.bookId}`);
              }}
            />
          ))}
        </div>
        <div className="flex justify-end my-[50px] mr-[10px]">
          <CustomPagination
            onChange={setIndexPage}
            current={indexPage}
            pageSize={pageSize}
            total={totalItems}
          />
        </div>
      </Section>
    </>
  );
};

export default ContentSide;
