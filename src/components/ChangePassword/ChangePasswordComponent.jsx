import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../customToast";
import { USER_API } from "../../services/constants";
import { sendRequest } from "../../services/sendRequest";
import usePopupStore from "../../stores/usePopupStore";

const ChangePasswordComponent = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentPassword.trim() || !newPassword.trim() || !reNewPass.trim()) {
        customToast({
          type: "error",
          message: "Vui lòng điền đầy đủ các trường thông tin",
        });
        return;
      }
      if (
        !/^\w+$/.test(currentPassword) ||
        !/^\w+$/.test(newPassword) ||
        !/^\w+$/.test(reNewPass)
      ) {
        customToast({
          type: "error",
          message: "Mật khẩu không chứa ký tự đặc biệt",
        });
        return;
      }
      if (newPassword !== reNewPass) {
        customToast({
          type: "error",
          message: "Mật khẩu chưa trùng khớp",
        });
        return;
      }
      if (
        currentPassword.length < 8 ||
        newPassword.length < 8 ||
        reNewPass.length < 8
      ) {
        customToast({
          type: "error",
          message: "Mật khẩu phải từ 8 ký tự trở lên",
        });
        return;
      }
      const checkPass =
        (currentPassword.length >= 8 && currentPassword.length <= 30) ||
        (newPassword.length >= 8 && newPassword.length <= 30) ||
        (reNewPass.length >= 8 && reNewPass.length <= 30);
      if (!checkPass) {
        customToast({
          type: "error",
          message: "Mật khẩu phải từ 8-30 ký tự",
        });
        return;
      }

      const dataResponse = await sendRequest({
        method: "PUT",
        endpoint: USER_API.CHANGE_PASSWORD,
        data: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      });
      const statusCode = dataResponse?.status;
      if (statusCode === 200) {
        customToast({
          type: "success",
          message: "Đổi mật khẩu thành công",
        });
        navigate("/profile");
      } else {
        const errorMessage =
          dataResponse?.data?.error || "Đổi mật khẩu thất bại";
        customToast({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Đổi mật khẩu thất bại";
      customToast({
        type: "error",
        message: errorMessage,
      });
    } finally {
      handleCloseLoading();
    }
  };

  return (
    <>
      <form className="mt-[100px]">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Đổi mật khẩu
              </p>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Mật khẩu hiện tại
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Mât khẩu mới
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  value={reNewPass}
                  onChange={(e) => setReNewPass(e.target.value)}
                  type="password"
                />
              </div>

              <button
                class="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordComponent;
