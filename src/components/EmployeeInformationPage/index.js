import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import UserInfomationComponent from "../UserInformationPage/UserInformationComponent";
const EmployeeInformationPage = () => {
  return (
    <>
      <AdminLayout>
        <UserInfomationComponent />
      </AdminLayout>
    </>
  );
};

export default EmployeeInformationPage;
