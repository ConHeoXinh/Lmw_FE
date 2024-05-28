import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiconfig from "../../services/apiconfig";
import { customToast } from "../../customToast";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleEmployeeCheckboxChange = (e) => {
    setIsEmployee(e.target.checked);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setError(null);
    navigate("/login");
    customToast({
      type: "success",
      message: "Đăng ký thành công",
    });
  };

  const handleFailure = (error) => {
    setSuccess(false);
    setError(error?.response?.data?.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Tên đăng nhập là bắt buộc");
      return;
    }
    if (!password.trim()) {
      setError("Mật khẩu là bắt buộc");
      return;
    }
    if (!email.trim()) {
      setError("Email là bắt buộc");
      return;
    }
    if (!phoneNumber.trim()) {
      setError("Số điện thoại là bắt buộc");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Nhập lại mật khẩu là bắt buộc");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải từ 8 ký tự trở lên");
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Số điện thoại phải là 10 số");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu chưa trùng khớp");
      return;
    }
    if (!/^\w+$/.test(username)) {
      setError("Tên đăng nhập không chứa kí tự đặc biệt");
      return;
    }
    if (!/^\w+$/.test(password)) {
      setError("Mật khẩu không chứa kí tự đặc biệt");
      return;
    }
    if (!/^\w+$/.test(confirmPassword)) {
      setError("Nhập lại mật khẩu không chứa kí tự đặc biệt");
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Email không chứa kí tự đặc biệt");
      return;
    }

    if (!checked) {
      setError("Chấp nhận điều khoản trước khi đăng ký");
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      role: isEmployee ? "employee" : "user",
    };

    apiconfig
      .register(newUser)
      .then((response) => {
        handleSuccess();
      })
      .catch((error) => {
        handleFailure(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center h-[950px] -mb-10"
    >
      <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
          <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center">
            Đăng ký tài khoản
          </p>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tên đăng nhập
            </label>
            <input
              placeholder="taikhoan"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              placeholder="taikhoan@example.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mật khẩu
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nhập lại mật khẩu
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Số điện thoại
            </label>
            <input
              placeholder="0123456789"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              id="phoneNumber"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                type="checkbox"
                aria-describedby="employeeCheckbox"
                id="employeeCheckbox"
                checked={isEmployee}
                onChange={handleEmployeeCheckboxChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 text-gray-300">
                Đăng ký làm nhân viên?
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                type="checkbox"
                aria-describedby="terms"
                id="terms"
                checked={checked}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 text-gray-300">
                Tôi đồng ý
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline text-primary-500 p-2"
                >
                  Điều khoản & dịch vụ
                </a>
              </label>
            </div>
          </div>

          <button
            className="w-full bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-yellow-800 text-black"
            type="submit"
            disabled={!checked}
          >
            Đăng ký
          </button>

          {error && <div className="text-red-500">{error}</div>}
          {success && (
            <div className="text-green-500">Tạo tài khoản thành công!</div>
          )}

          <p className="text-sm text-gray-900 mt-4">
            Đã có tài khoản?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Trở lại đăng nhập
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
