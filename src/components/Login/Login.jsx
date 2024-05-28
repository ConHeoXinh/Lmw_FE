import React, { useState } from "react";
import usePopupStore from "../../stores/usePopupStore";
import { sendRequest } from "../../services/sendRequest";
import { LOGIN_API } from "../../services/constants";
import useAuthStore from "../../stores/useAuthStore";
import { customToast } from "../../customToast";
import { setLocalStorageKey } from "../../utils/utils";
import { useNavigate } from "react-router";
import { TOKEN_EXPIRED_TIME, TOKEN_STORAGE } from "../../utils/constants";
import { Link } from "react-router-dom";
import { USER_ROLE } from "../../Roles";
import { DEFINE_ROUTES1 } from "../../routes/MenuAdmin";

const Login = () => {
  const navigate = useNavigate();
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const { setUser } = useAuthStore();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    handleOpenLoading();
    try {
      if (!userName.trim() || !password.trim()) {
        customToast({
          type: "error",
          message: "Vui lòng điền đầy đủ thông tin đăng nhập",
        });
        return;
      }
      if (!/^\w+$/.test(userName) || !/^\w+$/.test(password)) {
        customToast({
          type: "error",
          message: "Tài khoản hoặc mật khẩu không chứa ký tự đặc biệt",
        });
        return;
      }

      const dataResponse = await sendRequest({
        method: "POST",
        endpoint: LOGIN_API.SIGN_IN,
        data: {
          username: userName,
          password: password,
        },
      });
      const statusCode = dataResponse?.status;
      if (statusCode === 200) {
        const responseData = dataResponse?.data?.data || {};
        const userData = responseData?.user || {};
        const userId = responseData?.userID;
        const userRole = userData?.role;
        setUser({
          ...userData,
          userID: userId,
          roles: userData?.role,
        });
        const { token, expireDate } = dataResponse?.data?.data;
        setLocalStorageKey(TOKEN_STORAGE, token?.replace("Bearer ", ""));
        setLocalStorageKey(TOKEN_EXPIRED_TIME, expireDate);
        customToast({
          type: "success",
          message: "Đăng nhập thành công",
        });

        if (userRole === USER_ROLE.ROLE_EMPLOYEE) {
          navigate("/employee/customer/list");
        } else if (userRole === USER_ROLE.ROLE_ADMIN) {
          navigate(DEFINE_ROUTES1.ADMIN_INFORMATION);
        } else {
          navigate("/");
        }
      } else {
        const errorMessage = dataResponse?.data?.error || "Đăng nhập thất bại";
        customToast({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Đăng nhập thất bại";
      customToast({
        type: "error",
        message: errorMessage,
      });
    } finally {
      handleCloseLoading();
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[600px] -mb-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Đăng nhập
          </h2>
          <form className="flex flex-col">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Tên đăng nhập"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Mật khẩu"
            />
            <div className="flex items-center justify-between flex-wrap">
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Ghi nhớ tôi
              </label>
              <Link
                to="/forgot"
                className="text-sm text-blue-500 hover:underline mb-0.5"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <p className="text-gray-900 mt-4">
              {" "}
              Không có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-sm text-blue-500 -200 hover:underline mt-4"
              >
                Đăng ký
              </Link>
            </p>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-yellow-400 hover:bg-yellow-600 mt-4 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-yellow-800 text-black"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
