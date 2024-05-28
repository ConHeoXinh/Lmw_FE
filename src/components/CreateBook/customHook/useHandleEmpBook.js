import { customToast } from "../../../customToast";
import { BOOK_API } from "../../../services/constants";
import { sendRequest } from "../../../services/sendRequest";
import usePopupStore from "../../../stores/usePopupStore";
import { getErrorMessage } from "../../../utils/utils";
import { transformDetailData, transformInitData } from "../transform/transform";

const useHandleEmpBook = ({ isDetail, id, initialValuesBook }) => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();

  const loadData = async () => {
    let dataResponse = {};
    if (isDetail && id) {
      handleOpenLoading();
      try {
        dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${BOOK_API.GET_DETAIL}?id=${id}`,
        });
      } catch (error) {
        customToast({
          type: "error",
          message: getErrorMessage(error),
        });
      } finally {
        handleCloseLoading();
      }
      return transformDetailData(dataResponse?.data?.data?.book);
    }
    return {
      initialValuesBook,
    };
  };
  const loadInitData = async () => {
    try {
      handleOpenLoading();
      const dataResponse = await sendRequest({
        method: "GET",
        endpoint: `${BOOK_API.INIT_DATA_SEARCH}`,
      });
      const { listAuthor, listDepartment, listPublisher } =
        dataResponse?.data?.data;
      return {
        listAuthor: transformInitData(listAuthor),
        listDepartment: transformInitData(listDepartment),
        listPublisher: transformInitData(listPublisher),
      };
    } catch (error) {
      return {};
    } finally {
      handleCloseLoading();
    }
  };

  return { loadData, loadInitData };
};

export default useHandleEmpBook;
