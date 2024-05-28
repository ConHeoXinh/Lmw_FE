import React, { useRef, useState } from "react";
import TitlePage from "../../layout/TitlePage";
import AdminLayout from "../../layout/AdminLayout";
import InformationForm from "./Components/InformationForm";
import InformationBooks from "./Components/InformationBooks";
import { Button } from "antd";
import { customToast } from "../../customToast";
import { sendRequest } from "../../services/sendRequest";
import { INVOICE_API } from "../../services/constants";
import { useNavigate } from "react-router";
import {DEFINE_ROUTES} from "../../routes/MenuEmployee";

const EmployeeInvoiceAdd = () => {
  const navigate = useNavigate();

  const informationFormRef = useRef();
  const informationBooksRef = useRef();

  const [loading, setLoading] = useState(false);

  const submitInvoice = async () => {
    if (!informationFormRef.current) return;
    const formValue = await informationFormRef.current.formValues();
    if (!formValue) return;

    const orderData = informationBooksRef.current.getOrderData();
    if (orderData.length === 0) {
      customToast({
        type: "warning",
        message: "Vui lòng chọn sách!",
      });
      return;
    }

    const payload = {
      ...formValue,
      listOrderItem: orderData,
    };

    try {
      setLoading(true);
      const res = await sendRequest({
        method: "POST",
        endpoint: INVOICE_API.CREATE_INVOICE,
        data: payload,
      });
      console.log("res ", res);
      customToast({
        type: "success",
        message: "Tạo đơn thành công!",
      });
      navigate(DEFINE_ROUTES.EMPLOYEE_INVOICE_LIST)
    } catch (e) {
      const message = e.response?.data?.error ?? "Thao tác không thành công!";
      customToast({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <TitlePage title="Tạo đơn mượn" />
        <div
          className="flex flex-col"
          style={{ height: "calc(100vh - 150px)" }}
        >
          <div className="grid grid-cols-8 flex-1">
            <div className="col-span-2 border-r pr-4">
              <p className="text-lg font-bold bg-gray-50 pl-3 py-1 border-l-4 border-blue-500">
                Thông tin khách hàng
              </p>
              <div className="py-6">
                <InformationForm ref={informationFormRef} />
              </div>
            </div>
            <div className="col-span-6 pl-4">
              <p className="text-lg font-bold py-1 mb-6">Thông tin sách</p>
              <div>
                <InformationBooks ref={informationBooksRef} />
              </div>
            </div>
          </div>
          <div className="text-right pt-4 pb-1 border-t">
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                submitInvoice();
              }}
            >
              Tạo đơn
            </Button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EmployeeInvoiceAdd;
