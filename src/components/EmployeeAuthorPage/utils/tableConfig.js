import { renderStt } from "../../../utils/utils";
import ActionButtons from "../Components/ActionButtons";

export const getTableConfig = ({ handleOpen, setMessagePopup }) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên tác giả",
      dataIndex: "name",
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
      departmentName: `Edward King ${i}`,
    });
  }
  return listData;
};
