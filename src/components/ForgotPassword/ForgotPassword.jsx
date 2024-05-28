import React, { useState } from "react";
import apiconfig from "../../services/apiconfig";
import { setLocalStorageEmail, setLocalStorageKey } from "../../utils/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false); // State để kiểm tra xem email đã được gửi hay chưa
  const [isSubmitting, setIsSubmitting] = useState(false); // State để kiểm tra xem đang submit form hay không
  const [error, setError] = useState(""); // State để lưu thông báo lỗi

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Vui lòng nhập địa chỉ email"); // Kiểm tra nếu email trống, set thông báo lỗi
      return;
    }
    if (email.length > 30) {
      setError("Địa chỉ email không hợp lệ");
      return;
    }

    setLocalStorageKey("email", email);

    try {
      setIsSubmitting(true); // Đang submit form, vô hiệu hóa nút
      const response = await apiconfig.forgotPassword(email);
      console.log(response.data); // In ra dữ liệu phản hồi từ server nếu cần
      setEmailSent(true); // Cập nhật state khi email đã được gửi thành công
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Email này không tồn tại"); // Kiểm tra nếu email trống, set thông báo lỗi
    } finally {
      setIsSubmitting(false); // Kết thúc submit, kích hoạt lại nút
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen light">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quên mật khẩu</h2>

        {!emailSent ? (
          <form className="flex flex-col" onSubmit={handleEmailSubmit}>
            <input
              placeholder="Điền địa chỉ email"
              className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button
              className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting} // Vô hiệu hóa nút khi đang submit
            >
              {isSubmitting ? "Đang gửi..." : "Gửi email"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600 font-semibold mb-2">
              Email đã được gửi thành công! Vui lòng kiểm tra hòm thư của bạn.
            </p>
            <p className="text-sm text-gray-500">
              (Hãy kiểm tra email và làm theo hướng dẫn để đặt lại mật khẩu.)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
