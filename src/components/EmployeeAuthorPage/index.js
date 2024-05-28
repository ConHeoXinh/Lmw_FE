import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TableV2 from "../../layout/Tablev2";
import MessagePopup from "../../layout/MessagePopup";
import { sendRequest } from "../../services/sendRequest"; // Import sendRequest function
import { renderStt } from "../../utils/utils";
import { AUTHOR_API } from "../../services/constants"; // Import API constant for authors
import { getTableConfig } from "./utils/tableConfig";
import TitlePage from "../../layout/TitlePage";
import ButtonV2 from "../../layout/ButtonV2";
import { useNavigate } from "react-router-dom";
import { DEFINE_ROUTES } from "../../routes/MenuEmployee";

const EmployeeAuthorPage = (props) => {
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const navigate = useNavigate();
  const [messagePopup, setMessagePopup] = useState();
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    // Todo: Logic for search
    setSearchText(searchForm?.easySearch);
    setCurrentPage(1);
  };

  const handleAdvanceSearch = () => {
    // Todo: Logic for advanced search
  };

  const handleReset = () => {
    // Todo: Logic for reset
  };

  const fetchData = async (page) => {
    try {
      const res = await sendRequest({
        method: "POST",
        endpoint: searchText ? "/api/author/fill-search" : AUTHOR_API.AUTHOR, // Endpoint for author API
        params: {
          "index-page": page,
        },
        data: {
          searchText,
        },
      });
      const responseData = res?.data?.data?.searchList;
      const { content, totalElements, size } = responseData;
      const updatedData = content?.map?.((el, index) => ({
        stt: renderStt(index, page, size),
        ...el,
      }));

      setData(updatedData);
      setTotalItems(totalElements);
      setPageSize(size);
    } catch (error) {
      // Handle error when fetching data
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchText]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AdminLayout>
        <TitlePage
          title="Danh sách tác giả"
          rightComponent={
            <ButtonV2
              onClick={() => navigate(DEFINE_ROUTES.EMPLOYEE_AUTHOR_ADD)}
            >
              Thêm tác giả
            </ButtonV2>
          }
        />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm tên tác giả"
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

export default EmployeeAuthorPage;
