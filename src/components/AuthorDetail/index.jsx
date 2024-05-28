import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Section from "../../layout/Section";
import usePopupStore from "../../stores/usePopupStore";
import { useLocation } from "react-router-dom";
import { getErrorMessage, getObjectSearch } from "../../utils/utils";
import { sendRequest } from "../../services/sendRequest";
import { AUTHOR_API, BOOK_API } from "../../services/constants";
import { customToast } from "../../customToast";
import ReleatedBooks from "../BookDetailPage/Components/RelatedBooks";
import AuthorDetailComponent from "./Components/AuthorDetailComponent";

const AuthorDetail = () => {
  const { handleOpenLoading, handleCloseLoading } = usePopupStore();
  const [authorData, setAuthorData] = useState();
  const [relatedBook, setRelatedBook] = useState();
  const location = useLocation();
  useEffect(() => {
    const idSearch = getObjectSearch(location?.search)?.authorId;
    const fetchData = async () => {
      if (idSearch) {
        handleOpenLoading();
        try {
          const dataResponse = await sendRequest({
            method: "POST",
            endpoint: `${AUTHOR_API.AUTHOR_DETAIL}?id=${idSearch}&index-page=1`,
          });
          setAuthorData(dataResponse?.data?.data?.authorDetail);
          setRelatedBook(dataResponse?.data?.data?.bookList?.content);
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
  }, [getObjectSearch(location?.search)?.authorId]);

  return (
    <>
      <MainLayout>
        <Section title="Thông tin tác giả">
          <AuthorDetailComponent item={authorData} />
        </Section>
        <Section title="Sách liên quan">
          <ReleatedBooks data={relatedBook} />
        </Section>
      </MainLayout>
    </>
  );
};

export default AuthorDetail;
