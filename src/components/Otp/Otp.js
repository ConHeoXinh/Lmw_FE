import React, { useEffect, useState } from "react";
import apiconfig from "../../services/apiconfig";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const findOtp = window.location.href;
  const otpUrl = findOtp.split("?")[1].split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await apiconfig.confirmForgotPassword(otpUrl);
        setOtp(otpUrl);
        setEmail(dataResponse?.data?.message.split("/")[1]);
        localStorage.setItem('email', email);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div class="flex flex-col items-center justify-center h-screen light">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Mã otp</h2>

        <form class="flex flex-col">
          <div class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
            {otp}
          </div>
          <button
            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
            onClick={() => {
              navigate("/reset");
            }}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
