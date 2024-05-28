import { Table } from "antd";
import React from "react";
import CustomPagination from "../Pagination";
import SearchDataTable from "./Components/SearchDataTable/SearchDataTable";

const TableV2 = ({
  searchPlaceholder,
  searchForm,
  handleSearchForm,
  handleSearch,
  handleAdvanceSearch,
  handleReset,
  advanceSearch,
  current,
  handlePageChange,
  total,
  noPagination = false,
  noSearchDataTable = false,
  scrollX = 1400,
  scrollY = 500,
  pageSize = 10,
  ...props
}) => {
  return (
    <>
      <div>
        {!noSearchDataTable && (
          <SearchDataTable
            searchPlaceholder={searchPlaceholder}
            searchForm={searchForm}
            handleSearchForm={handleSearchForm}
            handleSearch={handleSearch}
            handleAdvanceSearch={handleAdvanceSearch}
            handleReset={handleReset}
            advanceSearch={advanceSearch}
          />
        )}
        <div
          style={{
            border: "1px solid #f0f0f0",
          }}
        >
          <Table
            {...props}
            pagination={false}
            scroll={{ x: scrollX, y: scrollY }}
          />
        </div>
        {!noPagination && (
          <div className="flex justify-between items-center mt-[30px]">
            <p>
              Hiện {props?.dataSource?.length || 0} trong tổng số {total}
            </p>
            <div>
              <CustomPagination
                pageSize={pageSize}
                current={current}
                total={total}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TableV2;
