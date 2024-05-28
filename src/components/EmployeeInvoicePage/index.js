import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TableV2 from "../../layout/Tablev2";
import { getTableConfig } from "./utils/tableConfig";
import TitlePage from "../../layout/TitlePage";
import MessagePopup from "../../layout/MessagePopup";
import { sendRequest } from "../../services/sendRequest";
import { INVOICE_API } from "../../services/constants";
import { transformDataInvoice } from "./utils/transform";
import usePopupStore from "../../stores/usePopupStore";
import ButtonV2 from "../../layout/ButtonV2";
import { useNavigate } from "react-router-dom";
import { DEFINE_ROUTES } from "../../routes/MenuEmployee";

const EmployeeInvoicePage = (props) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const navigate = useNavigate();
  const [messagePopup, setMessagePopup] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    setSearchText(searchForm?.easySearch);
    setCurrentPage(1);
  };
  const handleAdvanceSearch = () => {
    //Todo
  };
  const handleReset = () => {
    //Todo
  };
  // Backend cần trả về tổng số lượng item để fill vào cho total
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleOpenLoading();
        const res = await sendRequest({
          method: searchText ? "POST" : "GET",
          endpoint: searchText ? "/api/order/search" : INVOICE_API.LIST_INVOICE,
          params: {
            "index-page": currentPage,
          },
          data: {
            searchText,
          },
        });
        const data = res?.data?.data?.searchList;
        const { content, totalElements, size } = data;
        setData(transformDataInvoice(content, currentPage, size));
        setTotalItems(totalElements);
        setPageSize(size);
      } catch (error) {
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [currentPage, searchText]);
  return (
    <>
      <AdminLayout>
        <TitlePage
          title="Danh sách Đơn mượn"
          rightComponent={
            <ButtonV2
              onClick={() => navigate(DEFINE_ROUTES.EMPLOYEE_INVOICE_ADD)}
            >
              Thêm đơn mượn
            </ButtonV2>
          }
        />

        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm đơn mượn"
          handleSearchForm={handleSearchForm}
          handleAdvanceSearch={handleAdvanceSearch}
          handleReset={handleReset}
          handleSearch={handleSearch}
          columns={getTableConfig({ handleOpen, setMessagePopup })}
          dataSource={data}
          current={currentPage}
          total={totalItems}
          handlePageChange={setCurrentPage}
          pageSize={pageSize}
        />
      </AdminLayout>
      <MessagePopup
        open={open}
        handleCancel={handleCancel}
        message={messagePopup}
      ></MessagePopup>
    </>
  );
};

export default EmployeeInvoicePage;
