import { renderSttNoPagging } from "../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên sách",
      dataIndex: "bookName",
      width: "20%",
    },
    {
      title: "Giá tiền",
      dataIndex: "unitPrice",
      width: "10%",
    },
    { title: "Số lượng", dataIndex: "quantity", width: "10%" },
    {
      title: "Ngày mượn",
      dataIndex: "checkOutDate",
      width: "10%",
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
      width: "10%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      width: "5%",
    },
  ];
};

export const getData = () => {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push({
      stt: renderSttNoPagging(i),
      bookName: `Edward King ${i}`,
      language: "English",
      unitPrice: i,
      quantity: i,
    });
  }
  return listData;
};
