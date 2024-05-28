import React from "react";

function ConditionComponent(props) {
  return (
    <div class="h-screen bg-gray-100 flex flex-col justify-center items-center mb-48">
      <div class=" px-5 py-8 lg:py-8  max-w-[1280px] bg-white mt-52">
        <h2 class="text-2xl lg:text-2xl font-semibold mb-5 text-black leading-tight text-center">
          ĐIỀU KHOẢN SỬ DỤNG{" "}
        </h2>
        <div class="mt-8 text-gray-700 leading-relaxed">
          <p class="text-lightText mt-5">
            <div className="mb-4">
              Chào mừng quý khách đến với trang web của LMS. Sau khi truy cập và
              sử dụng trang web của chúng tôi, quý khách đồng ý tuân thủ và ràng
              buộc với những quy định của LMS. Hãy xem kỹ các quy định này và
              hợp tác với chúng tôi để xây dựng một trang web ngày càng thân
              thiện và phục vụ tốt hơn cho các yêu cầu của quý khách. Nếu có bất
              kỳ câu hỏi nào về những thỏa thuận này, vui lòng gửi email cho
              chúng tôi qua địa chỉ support@lms.com. <br />
            </div>
            <strong>Tài khoản của khách hàng</strong> <br />
            <div className=" mt-4 mb-4">
              Khi sử dụng dịch vụ của LMS, quý khách sẽ cung cấp thông tin về
              địa chỉ email, mật khẩu và họ tên để tạo tài khoản. Việc sử dụng
              và bảo mật thông tin tài khoản là trách nhiệm và quyền lợi của quý
              khách. Những thông tin khác như tên tuổi, địa chỉ cũng sẽ giúp LMS
              cung cấp dịch vụ tốt nhất cho quý khách. Trong trường hợp thông
              tin cung cấp không đầy đủ hoặc không chính xác, có thể dẫn đến
              việc không thể giao hàng, và LMS có quyền đình chỉ hoặc từ chối
              phục vụ mà không chịu trách nhiệm đối với quý khách. Quý khách
              cũng cần cập nhật thông tin trong tài khoản LMS khi có thay đổi.
              Quý khách phải giữ kín mật khẩu và tài khoản và chịu trách nhiệm
              với mọi hoạt động thông qua mật khẩu hoặc tài khoản của mình.
            </div>
            <strong>Quyền lợi bảo mật thông tin của khách hàng</strong> <br />
            <div className=" mt-4 mb-4">
              Quý khách cần thoát khỏi tài khoản LMS sau mỗi lần sử dụng để đảm
              bảo bảo mật thông tin. Khi sử dụng dịch vụ của LMS, quý khách được
              đảm bảo rằng thông tin cung cấp chỉ được sử dụng để nâng cao chất
              lượng dịch vụ và sẽ không chuyển giao cho bên thứ ba vì mục đích
              thương mại. Thông tin của quý khách sẽ được bảo mật và chỉ cung
              cấp khi pháp luật yêu cầu.
            </div>
            <strong>
              Trách nhiệm của khách hàng khi sử dụng dịch vụ của LMS
            </strong>{" "}
            <br />
            <div className=" mt-4 mb-4">
              Quý khách không được can thiệp hoặc xâm nhập vào hệ thống của LMS
              hoặc làm thay đổi cấu trúc dữ liệu tại trang web. Quý khách không
              được thực hiện hoặc khuyến khích việc can thiệp, xâm nhập dữ liệu
              của LMS hoặc hệ thống máy chủ. Hãy thông báo ngay cho quản trị
              viên của LMS nếu phát hiện lỗi hệ thống qua số điện thoại (84.08)
              38388832 - (84-08) 36026700 hoặc email support@lms.com. Quý khách
              không được viết nhận xét, đánh giá xúc phạm, quấy rối, hoặc có
              hành vi thiếu văn hóa đối với người khác. Cấm việc nói về chính
              trị, kỳ thị tôn giáo, giới tính, sắc tộc... hoặc mạo nhận là khách
              hàng khác khi sử dụng LMS.
            </div>
            <strong>Trách nhiệm và quyền lợi của LMS</strong> <br />
            <div className=" mt-4 ">
              {" "}
              Trong trường hợp phát sinh sự cố ngoài ý muốn, LMS sẽ không chịu
              trách nhiệm với mọi tổn thất phát sinh. Chúng tôi không cho phép
              tổ chức hoặc cá nhân khác quảng bá sản phẩm trên trang web của LMS
              mà không có sự đồng ý bằng văn bản từ LMS Corporation. Các thỏa
              thuận và quy định trong Điều Khoản Sử Dụng có thể thay đổi vào bất
              kỳ thời điểm nào, và sẽ được thông báo cụ thể trên trang web của
              LMS.
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConditionComponent;
