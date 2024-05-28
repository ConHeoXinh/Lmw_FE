import { renderStt } from "../../../utils/utils";

export const transformDataEmployeePage = (
  data,
  currentPage = 1,
  pageSize = 1
) => {
  return data?.map?.((el, index) => {
    return {
      stt: renderStt(index, currentPage, pageSize),
      ...el,
    };
  });
};
