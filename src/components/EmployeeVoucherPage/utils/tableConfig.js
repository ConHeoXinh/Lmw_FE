import { renderStt } from "../../../utils/utils";
import ActionButtons from "../Components/ActionButtons";

export const getTableConfig = ({ handleOpen, setMessagePopup }) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên khuyến mại",
      dataIndex: "code",
      width: "20%",
    },
    {
      title: "Phần trăm giảm",
      dataIndex: "percent",
      width: "20%",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Thời gian áp dụng",
      dataIndex: "timeless",
      width: "20%",
    },
    {
      title: "Thao tác",
      dataIndex: "copy",
      width: "25%",
      render: (_, record) => {
        return (
          <ActionButtons
            record={record}
            handleOpen={handleOpen}
            setMessagePopup={setMessagePopup}
          />
        );
      },
    },
  ];
};

export const getData = (currentPage = 1) => {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push({
      stt: renderStt(i, currentPage),
      code: `Edward King ${i}`,
      percent: ` ${i}%`,
      description: `test ${i}`,
      timeless: `${i} days`,
    });
  }
  return listData;
};
