import { random } from "lodash";
import { renderStt } from "../../../utils/utils";
import ActionButtons from "../Components/ActionButtons";

export const getTableConfig = (setTriggerReload) => {
  return [
    { title: "STT", dataIndex: "stt", width: "5%" },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employeeName",
      width: "20%",
      render: (_, record) => <>{`${record?.lastName} ${record.firstName}`}</>,
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "userStatus",
      width: "20%",
      render: (_, record) => (
        <>{record?.userStatus ? "Hoạt động" : "Dừng hoạt động"}</>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "copy",
      width: "10%",
      render: (_, record) => {
        return (
          <ActionButtons record={record} setTriggerReload={setTriggerReload} />
        );
      },
    },
  ];
};

export const getData = () => {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push({
      stt: renderStt(i, 1),
      employeeId: random(0, 1000),
      employeeIdCard: random(0, 1000),
      employeeAccountStatus: true,
      employeeName: `Edward King ${i}`,
    });
  }
  return listData;
};
