import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TableV2 from "../../layout/Tablev2";
import TitlePage from "../../layout/TitlePage";
import MessagePopup from "../../layout/MessagePopup";
import { sendRequest } from "../../services/sendRequest"; // Import sendRequest function
import { renderStt } from "../../utils/utils";
import { getTableConfig } from "./utils/tableConfig";
import { USER_API } from "../../services/constants";

const EmployeeCustomerPage = (props) => {
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const [messagePopup, setMessagePopup] = useState();
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    // Todo: Logic cho việc search
  };

  const handleAdvanceSearch = () => {
    // Todo: Logic cho việc advance search
  };

  const handleReset = () => {
    // Todo: Logic cho việc reset
  };

  const fetchData = async (page) => {
    try {
      const res = await sendRequest({
        method: "GET",
        endpoint: USER_API.USER,
        params: {
          "index-page": page,
        },
      });
      const responseData = res?.data?.data?.employeeList;
      const { content, totalElements, size } = responseData;

      const updatedData = content?.map?.((el, index) => ({
        stt: renderStt(index, page, size),
        fullName: el.firstName + " " + el.lastName,
        dateOfBirth: el.dob.split("T")[0],
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
  }, [currentPage]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AdminLayout>
        <TitlePage title="Danh sách khách hàng" />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm tên khách hàng"
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
      />
    </>
  );
};

export default EmployeeCustomerPage;
