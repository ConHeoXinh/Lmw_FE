import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Section from "../../layout/Section";
import DetailBookComponent from "./Components/DetailComponents";
import ReleatedBooks from "./Components/RelatedBooks";
import usePopupStore from "../../stores/usePopupStore";
import { useLocation } from "react-router-dom";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { BOOK_API } from "../../services/constants";
import { customToast } from "../../customToast";
import { transformData } from "./utils/transformData";

const BookDetailPage = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [bookData, setBookData] = useState();
  const [relatedBook, setRelatedBook] = useState();
  const location = useLocation();
  const [department, setdepartment] = useState();
  const [triggers, setTriggers] = useState(false);
  useEffect(() => {
    const idSearch = getObjectSearch(location?.search)?.id;
    const fetchData = async () => {
      if (idSearch) {
        handleOpenLoading();
        try {
          const dataResponse = await sendRequest({
            method: "GET",
            endpoint: `${BOOK_API.GET_DETAIL}?id=${idSearch}`,
          });
          setBookData(transformData(dataResponse?.data?.data?.book));
          setRelatedBook(dataResponse?.data?.data?.relatedBook);
          setdepartment(dataResponse?.data?.data?.book?.departments[0]);
        } catch (error) {
          customToast({
            type: "error",
            message: getErrorMessage(error),
          });
        } finally {
          handleCloseLoading();
        }
      }
    };
    fetchData();
  }, [getObjectSearch(location?.search)?.id, triggers]);

  return (
    <>
      <MainLayout>
        <Section title="Thông tin sách" department={department}>
          <DetailBookComponent item={bookData} setTriggers={setTriggers} />
        </Section>
        <Section title="Sách liên quan">
          <ReleatedBooks data={relatedBook} />
        </Section>
      </MainLayout>
    </>
  );
};

export default BookDetailPage;
