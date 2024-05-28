import React from "react";

const Table = ({ tableConfig, dataTable, footer, style, ...props }) => {
  return (
    <>
      <div class="relative overflow-x-auto w-[1640px]" style={style}>
        <table class="w-full text-sm text-left">
          <thead class="text-bold text-2xl">
            <tr>
              {tableConfig?.map?.((config) => (
                <th
                  scope="col"
                  class={`px-6 py-3 text-center w-[${config?.width}]`}
                  style={{ border: "1px solid #C4C4CF" }}
                >
                  {config?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            style={{
              border: "1px solid #C4C4CF",
            }}
          >
            {dataTable?.map?.((data) => {
              return (
                <tr>
                  {tableConfig?.map?.((config, index) => {
                    return (
                      <td
                        className={`px-6 py-4 font-medium whitespace-nowrap w-[${
                          config?.width || "10%"
                        }] ${!config?.textCenter && "text-center"}`}
                        style={{ border: "1px solid #C4C4CF" }}
                      >
                        {config?.customRender
                          ? data?.customRender?.[config?.name]
                          : data?.[config?.name]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {footer}
      </div>
    </>
  );
};

export default Table;
