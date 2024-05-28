import DatePickerOrder from "../Componenst/DatePickerOrder";
import DeleteButton from "../Componenst/DeleteButton";
import QuantityButton from "../Componenst/QuantityButton";

export const tableCartConfig = (setReloadData) => {
  return [
    {
      dataIndex: "title",
      title: "Tên sách",
      width: "25%",
      render: (_, record) => (
        <DeleteButton record={record} setReloadData={setReloadData} />
      ),
    },
    {
      dataIndex: "dateBetween",
      title: "Số ngày mượn",
      width: "10%",
      render: (_, record) => <span>{record?.dateBetween}</span>,
    },
    {
      dataIndex: "quantity",
      title: "Số lượng",
      width: "10%",
      render: (_, record) => (
        <QuantityButton record={record} setReloadData={setReloadData} />
      ),
    },
    {
      dataIndex: "checkoutDate",
      title: "Ngày mượn",
      width: "20%",
      render: (_, record) => (
        <DatePickerOrder
          record={record}
          type={"checkoutDate"}
          setReloadData={setReloadData}
        />
      ),
    },
    {
      dataIndex: "returnDate",
      title: "Ngày trả",
      width: "20%",
      render: (_, record) => (
        <DatePickerOrder
          record={record}
          type={"returnDate"}
          setReloadData={setReloadData}
        />
      ),
    },
    {
      dataIndex: "price",
      title: "Tổng tiền",
      width: "10%",
    },
  ];
};
