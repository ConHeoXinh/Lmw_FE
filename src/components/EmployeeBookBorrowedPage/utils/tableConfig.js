import { parseDateToString } from "../../../utils/dateFormat";
import ActionButtons from "../Components/ActionButtons";

export const getTableConfig = ({ setTriggerReload }) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Mã đơn",
      dataIndex: "codeOrder",
      width: "10%",
    },
    {
      title: "Tên sách",
      dataIndex: "bookName",
      width: "15%",
      render: (text, record) => record?.bookdto?.title,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      width: "15%",
      render: (text, record) => {
        const { firstName, lastName } = record?.userDto;
        return `${lastName} ${firstName}`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "5%",
      render: (text, record) => record?.quantity,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      width: "7%",
      render: (text, record) => record?.price,
    },
    {
      title: "Trả tiền",
      dataIndex: "payed",
      width: "8%",
      render: (text, record) => {
        return `${record?.payed ? "đã trả" : "chưa trả"}`;
      },
    },
    {
      title: "Ngày mượn",
      dataIndex: "checkoutDate",
      width: "10%",
      render: (text, record) => parseDateToString(text),
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
      width: "10%",
      render: (text, record) => parseDateToString(text),
    },
    {
      title: "Thao tác",
      dataIndex: "copy",
      width: "15%",
      render: (_, record) => {
        return (
          <ActionButtons record={record} setTriggerReload={setTriggerReload} />
        );
      },
    },
  ];
};
