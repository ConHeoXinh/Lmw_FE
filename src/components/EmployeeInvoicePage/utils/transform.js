import moment from "moment";
import { parseDateToString } from "../../../utils/dateFormat";
import { renderStt } from "../../../utils/utils";

export const transformDataInvoice = (data, currentPage = 1, pageSize = 1) => {
  return data?.map?.((el, index) => {
    return {
      stt: renderStt(index, currentPage, pageSize),
      ...el,
      ...el?.userDto,
      startDate: parseDateToString(el?.checkoutDate),
      exprieDate: parseDateToString(el?.returnDate),
      timeLess: moment(el?.returnDate).diff(el?.checkoutDate, "days"),
    };
  });
};
