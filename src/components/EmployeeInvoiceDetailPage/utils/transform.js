import { parseDateToString } from "../../../utils/dateFormat";
import { renderSttNoPagging } from "../../../utils/utils";

export const transformData = (data) => {
  const { orderDetials, orderItems } = data;
  return {
    ...orderDetials,
    ...orderItems,
    orderNo: `HD${orderDetials?.orderId}`,
    borrowUser: orderDetials?.userDto?.username,
    userEmail: orderDetials?.userDto?.email,
    checkOutDate: parseDateToString(orderDetials?.checkoutDate),
    returnDate: parseDateToString(orderDetials?.returnDate),
    listBook: orderItems?.map?.((item, index) => ({
      stt: renderSttNoPagging(index),
      ...item,
      ...item?.bookdto,
      bookName: item?.bookdto?.title,
      unitPrice: item?.price,
      price: item?.price * item?.quantity,
      checkOutDate: parseDateToString(orderDetials?.checkoutDate),
      returnDate: parseDateToString(orderDetials?.returnDate),
    })),
  };
};
