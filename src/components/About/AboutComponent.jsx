import React from "react";

function AboutComponent(props) {
  return (
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div class="text-center px-5 py-8 lg:py-16">
        <h2 class="text-4xl lg:text-5xl font-semibold mb-5 text-black leading-tight">
          Giới thiệu chung
        </h2>
        <img
          src="https://www.thatartsyreadergirl.com/wp-content/uploads/2022/01/TTT-Names.png"
          alt="img"
          class="w-96 lg:w-108 h-auto object-cover rounded-md shadow-lg mx-auto"
        />
        <h3 className="mt-6 text-sm font-semibold leading-tight text-black lg:text-xl">Giới thiệu thư viện Lms</h3>
        <div class="mt-8 text-gray-700 leading-relaxed">
          <p class="text-lightText mt-5">
            Chức năng: Là nơi cung cấp những cuốn sách với giá tiền phù hợp với mọi lứa tuổi,
          </p>
          <h3 className="mt-6 text-sm font-semibold leading-tight text-black lg:text-xl">Nhiệm vụ:</h3>
          <p class="text-lightText mt-5">-Mang đến trải nhiệm thuận tiện và nhanh chóng tới mọi người;</p>
          <p class="text-lightText mt-5">- Xây dựng hệ thống tra cứu tin thích hợp nhằm phục vụ và phổ biến thông tin cho toàn thể người dùng tin;</p>
        </div>
      </div>
    </div>
  );
}

export default AboutComponent;
