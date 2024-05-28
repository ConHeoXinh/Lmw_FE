import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TableV2 from "../../layout/Tablev2";
import { getData, getTableConfig } from "./utils/tableConfig";
import TitlePage from "../../layout/TitlePage";
import MessagePopup from "../../layout/MessagePopup";

const EmployeeVoucherPage = (props) => {
  const [searchForm, setSearchForm] = useState({
    easySearch: "",
  });
  const [messagePopup, setMessagePopup] = useState();
  const handleSearchForm = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    //Todo
  };
  const handleAdvanceSearch = () => {
    //Todo
  };
  const handleReset = () => {
    //Todo
  };
  // Backend cần trả về tổng số lượng item để fill vào cho total
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <AdminLayout>
        <TitlePage title="Danh sách khuyến mại" />
        <TableV2
          searchForm={searchForm}
          searchPlaceholder="Tìm kiếm tên người dùng"
          handleSearchForm={handleSearchForm}
          handleAdvanceSearch={handleAdvanceSearch}
          handleReset={handleReset}
          handleSearch={handleSearch}
          columns={getTableConfig({ handleOpen, setMessagePopup })}
          dataSource={getData()}
          current={1}
          total={50}
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

export default EmployeeVoucherPage;
