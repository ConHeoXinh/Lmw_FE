import { parseDateToString } from "../../../utils/dateFormat";

export const transformData = (data) => {
  return { ...data, dob: parseDateToString(data?.dob) };
};
