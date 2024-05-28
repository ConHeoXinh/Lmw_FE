import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TableV2 from "../../layout/Tablev2";
import { getData, getTableConfig } from "./utils/tableConfig";
import TitlePage from "../../layout/TitlePage";
import ButtonV2 from "../../layout/ButtonV2";
import { useNavigate } from "react-router";
import { DEFINE_ROUTES } from "../../routes/MenuEmployee";
import usePopupStore from "../../stores/usePopupStore";
import { BOOK_API, SEARCH_API } from "../../services/constants";
import { sendRequest } from "../../services/sendRequest";
import { renderStt } from "../../utils/utils";

const EmployeeBookPage = (props) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [data, setData] = useState([]);

  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    console.log('object :>> ', searchForm);
    try {
      handleOpenLoading();
      const res = await sendRequest({
        method: "POST",
        endpoint: SEARCH_API.TITLE_sEARCH,
        params: {
          "index-page": currentPage,
        },
        data: {
          "searchText": searchForm?.easySearch,
        },
      });
      const data = res?.data?.data?.books;
      const { content, totalElements, size } = data;
      setData(
        content?.map?.((el, index) => ({
          stt: renderStt(index, currentPage, size),
          ...el,
        }))
      );
      setTotalItems(totalElements);
      setPageSize(size);
    } catch (error) {
    } finally {
      handleCloseLoading();
    }
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
          method: "GET",
          endpoint: BOOK_API.GET_LIST_BOOK_EMP,
          params: {
            "index-page": currentPage,
          },
        });
        const data = res?.data?.data?.books;
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
  }, [currentPage]);
  return (
    <>
      <AdminLayout>
        <TitlePage
          title="Danh sách Sách"
          rightComponent={
            <ButtonV2 onClick={() => navigate(DEFINE_ROUTES.EMPLOYEE_BOOK_ADD)}>
              Thêm sách
            </ButtonV2>
          }
        />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm tên sách"
          handleSearchForm={handleSearchForm}
          handleAdvanceSearch={handleAdvanceSearch}
          handleReset={handleReset}
          handleSearch={handleSearch}
          columns={getTableConfig()}
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

export default EmployeeBookPage;
