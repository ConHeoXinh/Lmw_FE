import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import TitlePage from "../../layout/TitlePage";
import SectionV2 from "../../layout/SectionV2";
import InputField from "../../layout/InputField";
import TableV2 from "../../layout/Tablev2";
import { getTableConfig } from "./utils/tableConfig";
import ActionButtons from "./Components/ActionButtons";
import History from "../../layout/History";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { ORDER_API } from "../../services/constants";
import { customToast } from "../../customToast";
import { transformData } from "./utils/transform";

const EmployeeInvoiceDetailPage = () => {
  const location = useLocation();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [data, setData] = useState();
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const idSearch = getObjectSearch(location?.search)?.id;
    const fetchData = async () => {
      if (idSearch) {
        handleOpenLoading();
        try {
          const dataResponse = await sendRequest({
            method: "GET",
            endpoint: `${ORDER_API.GET_ORDER_DETAIL}/${idSearch}`,
          });
          setData(transformData(dataResponse?.data?.data));
        } catch (error) {
          customToast({
            type: "error",
            message: getErrorMessage(error),
          });
        } finally {
          handleCloseLoading();
        }
      }
    };
    fetchData();
  }, [getObjectSearch(location?.search)?.id, triggerReload]);
  return (
    <>
      <AdminLayout>
        <TitlePage title="Chi tiết đơn mượn" />
        <SectionV2 title="Chi tiết">
          <div className="grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
            <InputField label="Số đơn mượn" value={data?.orderNo} />
            <InputField label="Người mượn" value={data?.borrowUser} />
            <InputField label="Người email" value={data?.userEmail} />
            <InputField
              label="Trạng thái"
              value={data?.orderStatus ? "Chấp thuận" : "Từ chối"}
            />
            <InputField label="Ngày mượn sách" value={data?.checkOutDate} />
            <InputField label="Ngày trả sách" value={data?.returnDate} />
          </div>
        </SectionV2>
        <SectionV2 title="Danh sách sách mượn">
          <TableV2
            noSearchDataTable
            noPagination
            columns={getTableConfig()}
            dataSource={data?.listBook}
            scrollY={300}
          />
          <div className="flex justify-end mt-[30px]">
            Tổng tiền :{" "}
            {data?.listBook?.reduce((acc, currentValue) => {
              return acc + currentValue?.price || 0;
            }, 0)}
          </div>
        </SectionV2>
        <ActionButtons data={data} setTriggerReload={setTriggerReload} />
        <History />
      </AdminLayout>
    </>
  );
};

export default EmployeeInvoiceDetailPage;
