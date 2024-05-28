import React, { useState } from "react";
import apiconfig from "../../services/apiconfig";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailLocal = localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      email: emailLocal,
      password: password,
    };
    localStorage.removeItem("email");
     apiconfig
      .resetPassword(newData)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        console.log("error :>> ");
      });
  };

  return (
    <>
      <form className="mt-[100px]" onSubmit={handleSubmit}>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p class="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Đặt lại mật khẩu
              </p>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Mật Khẩu mới{" "}
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="newPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Nhập lại mật khẩu
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="reNewPassword"
                  type="password"
                />
              </div>

              <button
                class="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
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

export default ResetPassword;
