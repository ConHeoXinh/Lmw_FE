import { parseDateToString } from "../../../utils/dateFormat";

export const transformData = (data) => {
  return {
    ...data,
    copiesAvailabel: data?.["copies_available"],
    length: data?.page,
    releaseDate: parseDateToString(data?.createAt),
  };
};
