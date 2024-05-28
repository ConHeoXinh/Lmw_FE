import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import MessagePopup from "../../layout/MessagePopup";
import TableV2 from "../../layout/Tablev2";
import { getTableConfig } from "./utils/tableConfig";
import TitlePage from "../../layout/TitlePage";
import usePopupStore from "../../stores/usePopupStore";
import { renderStt } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";

const EmployeeBookBorrowedPage = (props) => {
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const [messagePopup, setMessagePopup] = useState();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [data, setData] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);

  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    //Todo
    setCurrentPage(1);
    setSearchText(searchForm?.easySearch);
  };
  const handleAdvanceSearch = () => {
    //Todo
  };
  const handleReset = () => {
    //Todo
  };
  // Backend cần trả về tổng số lượng item để fill vào cho total
  useEffect(() => {
    const fetchData = async () => {
      try {
        handleOpenLoading();
        const res = await sendRequest({
          method: "POST",
          endpoint: "/api/order/list-book-borrow/search",
          params: {
            "index-page": currentPage,
          },
          data: {
            searchText,
          },
        });
        const data = res?.data?.data?.searchList;
        const { content, totalElements, size } = data;
        setData(
          content?.map?.((el, index) => ({
            stt: renderStt(index, currentPage, size),
            ...el,
          }))
        );
        console.log('data :>> ', data);
        setTotalItems(totalElements);
        setPageSize(size);
      } catch (error) {
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [currentPage, searchText, triggerReload]);

  const handleOpen = () => {

  };

  return (
    <>
      <AdminLayout>
        <TitlePage title="Danh sách Sách cho mượn" />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm theo mã"
          handleSearchForm={handleSearchForm}
          handleAdvanceSearch={handleAdvanceSearch}
          handleReset={handleReset}
          handleSearch={handleSearch}
          columns={getTableConfig(setTriggerReload)}
          dataSource={data}
          current={currentPage}
          total={totalItems}
          handlePageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </AdminLayout>
    </>
  );
};

export default EmployeeBookBorrowedPage;
