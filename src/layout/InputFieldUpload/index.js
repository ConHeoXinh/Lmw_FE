import React, { useRef } from "react";
import ButtonV2 from "../ButtonV2";
import { sendRequest } from "../../services/sendRequest";
import { customToast } from "../../customToast";
import { getErrorMessage } from "../../utils/utils";
import usePopupStore from "../../stores/usePopupStore";

const InputFieldUpload = ({
  label,
  disabled,
  name,
  endpoint = "/api/book/insert-book-image",
  setDataChange,
  method = "POST",
  className,
  ...props
}) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const inputRef = useRef();
  const handleOpenFileInput = () => {
    inputRef.current.click();
  };
  const handleUploadFile = async (e) => {
    handleOpenLoading();
    let formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0]?.name);
    try {
      const res = await sendRequest({
        endpoint: endpoint,
        method: method,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDataChange && setDataChange(res?.data?.data?.imageLink);
    } catch (error) {
      customToast({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      handleCloseLoading();
    }
  };
  return (
    <>
      <div className={`w-full ${className}`}>
        {label && <p className="w-[100%] mb-[5px]">{label}</p>}{" "}
        <input
          ref={inputRef}
          className={`text-gray-900 rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 mr-[20px] w-[100%] ${
            disabled && "bg-gray-300 cursor-no-drop"
          }`}
          style={{
            display: "none",
            border: "1px #d9d9d9 solid",
          }}
          disabled={disabled}
          name={name}
          type={"file"}
          {...props}
          onChange={handleUploadFile}
          accept="image/*"
        />
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
            onClick={handleOpenFileInput}
            style={{ borderRadius: 5 }}
          >
            Tải ảnh lên
          </ButtonV2>
        </div>
      </div>
    </>
  );
};

export default InputFieldUpload;
