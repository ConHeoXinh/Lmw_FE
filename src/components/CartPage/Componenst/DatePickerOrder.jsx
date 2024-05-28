import React from "react";
import InputDatePicker from "../../../layout/DatePicker";
import { DATE_FORMAT, parseDatePayload } from "../../../utils/dateFormat";
import dayjs from "dayjs";
import moment from "moment";
import useOrderHooks from "../customHook/useOrderHooks";

const DatePickerOrder = ({ record, type, setReloadData, placeholder }) => {
  const { handleUpdateCartOrder } = useOrderHooks({ record, setReloadData });
  return (
    <>
      <InputDatePicker
        value={dayjs(record?.[type], DATE_FORMAT.dateFormat)}
        name={`${type}-${record?.id}`}
        format={DATE_FORMAT.dateFormat}
        placeholder={placeholder}
        onChange={(e) => {
          handleUpdateCartOrder({
            ...record,
            codeVoucher: "",
            [type]: e?.$d
              ? moment(e?.$d).format(DATE_FORMAT.dateFormatPayload)
              : "",
            [type === "checkoutDate" ? "returnDate" : "checkoutDate"]:
              parseDatePayload(
                record?.[
                  type === "checkoutDate" ? "returnDate" : "checkoutDate"
                ]
              ),
          });
        }}
      />
    </>
  );
};

export default DatePickerOrder;
