import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import MessagePopup from "../../layout/MessagePopup";
import TableV2 from "../../layout/Tablev2";
import TitlePage from "../../layout/TitlePage";
import { DEPARTMENT_API } from "../../services/constants";
import { sendRequest } from "../../services/sendRequest"; // Import sendRequest function
import { renderStt } from "../../utils/utils";
import { getTableConfig } from "./utils/tableConfig";
import { DEFINE_ROUTES } from "../../routes/MenuEmployee";
import { useNavigate } from "react-router-dom";
import ButtonV2 from "../../layout/ButtonV2";

const EmployeeDepartmentPage = (props) => {
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
  const [searchText, setSearchText] = useState();
  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    // TODO: Logic cho việc tìm kiếm
    setSearchText(searchForm?.easySearch);
    setCurrentPage(1);
  };

  const handleAdvanceSearch = () => {
    // TODO: Logic cho việc tìm kiếm nâng cao
  };

  const handleReset = () => {
    // TODO: Logic cho việc reset
  };

  const fetchData = async (page) => {
    try {
      const res = await sendRequest({
        method: "POST",
        endpoint: searchText
          ? "/api/department/fill-search"
          : DEPARTMENT_API.DEPARTMENT, // Điều chỉnh endpoint tương ứng
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
      // Xử lý lỗi khi fetch dữ liệu
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
          title="Danh sách danh mục"
          rightComponent={
            <ButtonV2
              onClick={() => navigate(DEFINE_ROUTES.EMPLOYEE_DEPARTMENT_ADD)}
            >
              Thêm danh mục
            </ButtonV2>
          }
        />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm tên danh mục"
          handleSearchForm={handleSearchForm}
          handleAdvanceSearch={handleAdvanceSearch}
          handleReset={handleReset}
          handleSearch={handleSearch}
          columns={getTableConfig({ handleOpen, setMessagePopup })} // Điều chỉnh hàm lấy cấu hình bảng nếu cần thiết
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

export default EmployeeDepartmentPage;
