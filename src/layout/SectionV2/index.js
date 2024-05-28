import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const SectionV2 = ({ children, title, className, ...props }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <div
        className={`w-[100%] mb-[30px] p-[15px] rounded-[10px] shadow-2xl ${className}`}
        style={{
          border: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #f0f0f0",
          }}
          className="relative"
        >
          <h3 className="mb-[10px] font-bold">{title}</h3>
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
        {expanded && <div className="my-[20px]"> {children}</div>}
      </div>
    </>
  );
};

export default SectionV2;
