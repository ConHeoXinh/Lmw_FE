import React from "react";
import SectionV2 from "../SectionV2";
import TableV2 from "../Tablev2";
import { getTableConfig } from "./config/tableConfig";

const History = ({ historyData }) => {
  return (
    <SectionV2 title={"Lịch sử"} className="mt-[20px]">
      <TableV2
        columns={getTableConfig()}
        dataSource={historyData}
        noPagination
        noSearchDataTable
        scrollY={200}
      />
    </SectionV2>
  );
};

export default History;
