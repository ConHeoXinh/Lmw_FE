import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TitlePage from "../../layout/TitlePage";
import TableV2 from "../../layout/Tablev2";
import { getTableConfig } from "./configs/TableConfig";
import ButtonV2 from "../../layout/ButtonV2";
import { useNavigate } from "react-router";
import { transformDataEmployeePage } from "./transform";
import { sendRequest } from "../../services/sendRequest";
import usePopupStore from "../../stores/usePopupStore";
import { SEARCH_API } from "../../services/constants";
import { renderStt } from "../../utils/utils";

const AdminEmployeePage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [data, setData] = useState([]);
  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [triggerReload, setTriggerReload] = useState(false);
  const handleSearch = async () => {
    setCurrentPage(1);
    console.log('object :>> ', searchForm);
    try {
      handleOpenLoading();
      const res = await sendRequest({
        method: "GET",
        endpoint: SEARCH_API.EMPL_SERARCH,
        params: {
          "index-page": currentPage,
          "username": searchForm?.easySearch,
        }
      });
      const data = res?.data?.data?.employeeList;
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
          endpoint: "/api/admin/list",
          params: {
            "index-page": currentPage,
          },
        });
        const data = res?.data?.data?.employeeList;
        const { content, totalElements, size } = data;
        setData(transformDataEmployeePage(content, currentPage, size));
        setTotalItems(totalElements);
        setPageSize(size);
      } catch (error) {
      } finally {
        handleCloseLoading();
      }
    };
    fetchData();
  }, [currentPage, triggerReload]);
  return (
    <AdminLayout>
      <TitlePage
        title="Danh sách nhân viên"
        rightComponent={<ButtonV2>Thêm nhân viên</ButtonV2>}
      />
      <TableV2
        searchForm={searchForm}
        searchPlaceholder="Tìm kiếm tên đăng nhập"
        handleSearchForm={handleSearchForm}
        handleAdvanceSearch={handleAdvanceSearch}
        handleReset={handleReset}
        handleSearch={handleSearch}
        columns={getTableConfig(setTriggerReload)}
        dataSource={data}
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        handlePageChange={setCurrentPage}
      />
    </AdminLayout>
  );
};

export default AdminEmployeePage;
