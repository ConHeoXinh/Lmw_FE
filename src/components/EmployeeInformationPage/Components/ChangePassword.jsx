import React from "react";
import ButtonV2 from "../../../layout/ButtonV2";
import { useNavigate } from "react-router";

const ChangePassword = ({ disabled }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100%]">
        <p className="w-[100%] mb-[5px]">Đổi mật khẩu</p>
        <div
          className={`text-gray-900 rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 mr-[20px] w-[100%] ${
            disabled && "bg-gray-300 cursor-no-drop"
          } h-[42px] flex justify-end`}
          style={{
            border: "1px #d9d9d9 solid",
          }}
        >
          <ButtonV2
            className="h-[100%] mr-[0]"
            onClick={() => {
              navigate("/changepassword");
            }}
            style={{ borderRadius: 5 }}
          >
            Cập nhật
          </ButtonV2>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
