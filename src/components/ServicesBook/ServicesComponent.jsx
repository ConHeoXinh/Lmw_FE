import React from "react";

const ServicesComponent = () => {
  return (
    <div className="flex items-center min-h-screen bg-white">
      <div className="container flex flex-col items-center justify-between px-4 py-8 mx-auto lg:py-16 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="px-5 py-4 text-center lg:text-left lg:px-32">
            <p className="mt-5 italic text-black text-lightText">
              Dịch vụ của chúng tôi
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-black lg:text-5xl">
              Cảm ơn đã đến với trang của chúng tôi
            </h2>
            <h3 className="mt-6 text-sm font-semibold leading-tight text-black lg:text-xl">
              1. MƯỢN SÁCH
            </h3>
            <h4 className="mt-6 text-sm font-semibold leading-tight text-black lg:text-md"> 1.1 Hạn ngạch:</h4>
            <p className="mt-5 text-black text-lightText">
              - Bạn không phải là thành viên của hệ thống: Hãy đến mượn sách trực tiếp tại thư viện;
            </p>
            <p className="mt-5 text-black text-lightText">
              - Bạn là thành viên: Đượctạo tối đa 3 đơn mượn sách trên một ngày;
            </p>

            <h4 className="mt-6 text-sm font-semibold leading-tight text-black lg:text-md" >1.2 Điều kiện:</h4>
            <p className="mt-5 text-black text-lightText">- Bạn cần xuất trình mã đơn hàng được gửi thì mới có thể đến nhận sách;</p>
            <p className="mt-5 text-black text-lightText">- Bạn đọc không vi phạm nội quy thư viện.</p>

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

export default ServicesComponent;
