import { DEFINE_ROUTES } from "../../../routes/MenuEmployee";
import { renderHyperLink, renderStt } from "../../../utils/utils";
import ActionButtons from "../Components/ActionButtons";
export const getTableConfig = ({ handleOpen, setMessagePopup }) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      width: "10%",
      render: (text, record) =>
        // renderHyperLink(
        //   text,
        //   `${DEFINE_ROUTES.ADMIN_CUSTOMER}?id=${record.id}`
        // ),
        text,
    },
    {
      title: "Họ & tên",
      dataIndex: "fullName",
      width: "15%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      width: "10%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: "10%",
    },

    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "copy",
    //   width: "25%",
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
