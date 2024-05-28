import React from "react";
import { Link } from "react-router-dom";
import Button from "../../layout/Button";
import { isEmpty } from "lodash";
import useAuthStore from "../../stores/useAuthStore";

const Home = () => {
  const { user, setUser } = useAuthStore();
  return (
    <div className="min-h-screen flex items-center bg-[#1B3764]">
      <div className="container flex flex-col items-center justify-between px-4 py-8 mx-auto lg:py-16 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="px-5 py-4 text-center lg:text-left lg:px-32">
            <p className="mt-5 italic text-lightText text-slate-100">
              Chào mừng tới LMS
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white lg:text-5xl">
              Chào mừng bạn đã đến với thư viện trực tuyến của chúng tôi
            </h2>
            <p className="mt-5 text-lightText text-slate-400">
              LMS.com không hỗ
              trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả
              Hệ Thống LMS trên toàn quốc.
            </p>
            <div className="mt-8">
              {isEmpty(user) ? (
                <Link to="/login" className="ml-3">
                  <Button title="Danh sách thích" />
                </Link>
              ) : (
                <Link to="/favorite" className="ml-3">
                  <Button title="Danh sách thích" />
                </Link>
              )}
            </div>
            <div className="mt-8">
              {isEmpty(user) ? (
                <Link to="/login" className="ml-3">
                  <Button title="Danh sách mượn" />
                </Link>
              ) : (
                <Link to="/borrow" className="ml-3">
                  <Button title="Danh sách mượn" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-1/2">
          <img
            src={
              "https://www.thatartsyreadergirl.com/wp-content/uploads/2022/01/TTT-Names.png"
            }
            alt="img"
            className="object-contain h-auto w-80 lg:w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
