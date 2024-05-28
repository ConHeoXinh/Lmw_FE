import { DEFINE_ROUTES } from "../../../routes/MenuEmployee";
import { renderHyperLink, renderStt } from "../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên sách",
      dataIndex: "title",
      width: "20%",
      render: (text, record) =>
        renderHyperLink(
          text,
          `${DEFINE_ROUTES.EMPLOYEE_BOOK_DETAIL}?id=${record.id}`
        ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      width: "15%",
      render: (_, record) => (
        <span>{record?.authors?.map((el) => el?.name)?.join(", ")}</span>
      ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      width: "10%",
    },
    // { title: "Kệ sách", dataIndex: "table", width: "10%" },
    // {
    //   title: "Hàng số",
    //   dataIndex: "lineOfTables",
    //   width: "10%",
    // },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
    },
    {
      title: "Số lượng muợn",
      dataIndex: "copies",
      width: "10%",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "copies_available",
      width: "10%",
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "copy",
    //   width: "10%",
    //   render: (_, record) => {
    //     return <ActionButtons record={record} />;
    //   },
    // },
  ];
};

export const getData = (currentPage = 1) => {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push({
      stt: renderStt(i, currentPage),
      name: `Edward King ${i}`,
      language: "English",
      author: `Test ${i}`,
      table: `${i}`,
      lineOfTables: `${i}`,
      copy: `${i}`,
      copyAvailable: `${i}`,
    });
  }
  return listData;
};
