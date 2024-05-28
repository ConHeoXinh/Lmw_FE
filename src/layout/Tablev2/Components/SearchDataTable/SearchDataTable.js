import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const SearchDataTable = ({
  searchForm,
  handleSearchForm,
  searchPlaceholder,
  handleSearch,
  handleAdvanceSearch,
  advanceSearch,
  handleReset,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div
        className="w-[100%] mb-[30px] p-[15px] rounded-[10px] shadow-2xl"
        style={{
          border: "1px solid #f0f0f0",
        }}
      >
        <div className="relative">
          <input
            type="text"
            className={`text-gray-900 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 mr-[20px] w-[85%] ${
              expanded && "bg-gray-300 cursor-no-drop"
            }`}
            style={{
              border: "1px solid #000",
            }}
            placeholder={searchPlaceholder}
            name="easySearch"
            value={searchForm?.esaySearch}
            disabled={expanded}
            onChange={handleSearchForm}
          />
          <button
            className={` py-[5px] px-[20px] text-white rounded-[10px] mr-[20px] font-medium ${
              expanded ? "bg-gray-500 cursor-no-drop" : "bg-sky-600"
            }`}
            onClick={handleSearch}
            disabled={expanded}
          >
            Tìm kiếm
          </button>
          {expanded ? (
            <UpCircleOutlined
              onClick={() => setExpanded((prev) => !prev)}
              style={{
                position: "absolute",
                top: 10,
                right: 0,
              }}
            />
          ) : (
            <DownCircleOutlined
              onClick={() => setExpanded((prev) => !prev)}
              style={{
                position: "absolute",
                top: 10,
                right: 0,
              }}
            />
          )}
        </div>
        <div>
          {expanded && (
            <>
              {advanceSearch}
              <div className="flex mt-[10px] justify-center">
                <button
                  className="py-[5px] px-[20px] rounded-[10px] mr-[20px] text-sky-600 font-medium"
                  style={{
                    border: "1px #0284c7 solid",
                  }}
                  onClick={handleReset}
                >
                  Làm mới
                </button>
                <button
                  className="py-[5px] px-[20px] bg-sky-600 text-white rounded-[10px] mr-[20px] font-medium"
                  onClick={handleAdvanceSearch}
                >
                  Tìm kiếm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDataTable;
