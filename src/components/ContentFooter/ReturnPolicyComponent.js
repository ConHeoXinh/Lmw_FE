import React from "react";

function ReturnPolicyComponent(props) {
  return (
    <div class="h-screen bg-gray-100 flex flex-col justify-center items-center ">
      <div class=" px-5 py-8 lg:py-8  max-w-[1280px] bg-white mt-8">
        <h2 class="text-2xl lg:text-2xl font-semibold mb-5 text-black leading-tight text-center">
          CHÍNH SÁCH ĐỔI / TRẢ / HOÀN TIỀN
        </h2>
        <div class="mt-8 text-gray-700 leading-relaxed">
          <p class="text-lightText mt-5">
            <div className="mb-4">
              Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách
              hàng khi trải nghiệm mua hàng tại Fahasa.com. Do đó chúng tôi luôn
              cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ mọi nhu cầu mua sắm
              của quý khách. <br />
            </div>
            <strong>Đổi Sách:</strong> <br />
            <div className=" mt-4 mb-4">
              1. Khách hàng có thể đổi sách trong vòng 3 ngày kể từ ngày mượn
              sách với điều kiện sách còn mới, chưa sử dụng, không bị rách hoặc
              hư hỏng. <br />
              2. Sách được đổi phải đi kèm với hóa đơn mượn hàng hoặc thông tin
              xác nhận mượn.
            </div>
            <strong>Trả Sách:</strong> <br />
            <div className=" mt-4 mb-4">
              1.Thư viện chấp nhận trả sách trong vòng 7 ngày kể từ ngày mượn
              sách.
              <br />
              2. Sách cần được trả về trong tình trạng không thay đổi so với khi
              mượn, cùng với hóa đơn mua hàng hoặc thông tin xác nhận mua.
            </div>
            <strong>Hoàn Tiền:</strong> <br />
            <div className=" mt-4 mb-4">
              1. Hoàn tiền sẽ được xử lý khi sách được trả về và kiểm tra chất
              lượng đạt yêu cầu. <br />
              2. Chúng tôi sẽ hoàn tiền dựa trên số ngày khách đã mượn so với
              ngày hẹn trả sách
            </div>
            <strong>Điều Kiện Đặc Biệt:</strong> <br />
            <div className=" mt-4 ">
              Sách đã sử dụng hoặc bị hư hỏng sẽ không được đổi/trả/hoàn tiền.{" "}
              <br />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicyComponent;
