import { renderSttNoPagging } from "../../../utils/utils";

export const getTableConfig = () => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Chi tiết",
      dataIndex: "actionDetail",
      width: "60%",
    },
    {
      title: "Action",
      width: "15%",
    },
  ];
};

export const getData = () => {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push({
      stt: renderSttNoPagging(i),
      actionDetail: `Test ${i}`,
    });
  }
  return listData;
};
