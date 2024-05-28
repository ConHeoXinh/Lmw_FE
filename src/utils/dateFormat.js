import moment from "moment";

export const DATE_FORMAT = {
  dateFormat: "DD-MM-YYYY",
  dateFormatPayload: "YYYY-MM-DD",
};
export const parseDateToString = (date) => {
  return date
    ? moment(date, DATE_FORMAT.dateFormatPayload).format(DATE_FORMAT.dateFormat)
    : null;
};

export const parseDatePayload = (date) => {
  return date
    ? moment(date, DATE_FORMAT.dateFormat).format(DATE_FORMAT.dateFormatPayload)
    : null;
};
