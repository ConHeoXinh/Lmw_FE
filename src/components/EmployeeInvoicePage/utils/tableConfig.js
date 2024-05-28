import { DEFINE_ROUTES } from "../../../routes/MenuEmployee";
import { renderHyperLink } from "../../../utils/utils";
import ActionButtons from "../Components/ActionButtons";

export const getTableConfig = ({ handleOpen, setMessagePopup }) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Số đơn mượn",
      dataIndex: "code",
      width: "20%",
      render: (text, record) =>
        renderHyperLink(
          `${record.code}`,
          `${DEFINE_ROUTES.EMPLOYEE_INVOICE_DETAIL}?id=${record.orderId}`
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      width: "10%",
      render: (_, record) => <>{record?.orderStatus ? "Phê duyệt" : "Đang chờ phê duyệt"}</>,
    },
    // {
    //   title: "Ngày mượn",
    //   dataIndex: "startDate",
    //   width: "15%",
    // },
    // { title: "Ngày trả", dataIndex: "exprieDate", width: "15%" },
    // {
    //   title: "Thao tác",
    //   dataIndex: "copy",
    //   width: "30%",
    //   render: (_, record) => {
    //     return (
    //       <ActionButtons
    //         record={record}
    //         handleOpen={handleOpen}
    //         setMessagePopup={setMessagePopup}
    //       />
    //     );
    //   },
    // },
  ];
};
