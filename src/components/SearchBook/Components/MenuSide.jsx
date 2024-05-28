import React, { useEffect, useState } from "react";
import MenuSection from "./MenuSection";
import CheckBox from "../../../layout/CheckBox";
import { sendRequest } from "../../../services/sendRequest";
import { BOOK_API } from "../../../services/constants";
import useSearchStore from "../../../stores/useSearchStore";
import { Rate } from "antd";

const MenuSide = () => {
  const [listAuthor, setListAuthor] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listPublisher, setListPublisher] = useState([]);
  const { searchData, setSearchData } = useSearchStore();
  useEffect(() => {
    const loadInitData = async () => {
      try {
        const dataResponse = await sendRequest({
          method: "GET",
          endpoint: `${BOOK_API.INIT_DATA_SEARCH}`,
        });
        const { listAuthor, listDepartment, listPublisher } =
          dataResponse?.data?.data;
        setListAuthor(listAuthor);
        setListDepartment(listDepartment);
        setListPublisher(listPublisher);
      } catch (error) {}
    };
    loadInitData();
  }, []);
  const languageData = ["vietnamese", "english"];

  return (
    <>
      <MenuSection title="Nhà xuất bản">
        <>
          {listPublisher?.map?.((publisher) => (
            <CheckBox
              id={publisher?.id}
              label={publisher?.name}
              value={publisher?.name}
              onClick={() =>
                setSearchData({
                  publisher:
                    searchData?.publisher === publisher?.name
                      ? ""
                      : publisher?.name,
                })
              }
              checked={searchData?.publisher === publisher?.name}
            />
          ))}
        </>
      </MenuSection>
      <MenuSection title="Mục">
        <>
          {listDepartment?.map?.((department) => (
            <CheckBox
              id={department?.id}
              label={department?.name}
              value={department?.name}
              onClick={() =>
                setSearchData({
                  department:
                    searchData?.department === department?.name
                      ? ""
                      : department?.name,
                })
              }
              checked={searchData?.department === department?.name}
            />
          ))}
        </>
      </MenuSection>
      <MenuSection
        title="Rating"
        style={{
          borderTop: "none",
        }}
      >
        <Rate
          value={searchData?.minRate}
          onChange={(e) =>
            setSearchData({
              minRate: e,
            })
          }
        />
      </MenuSection>
      <MenuSection
        title="Ngôn ngữ"
        style={{
          borderTop: "none",
        }}
      >
        <>
          {languageData?.map?.((language) => (
            <CheckBox
              id={language}
              label={language}
              className="mb-[5px]"
              value={language}
              onClick={() =>
                setSearchData({
                  language: searchData?.language === language ? "" : language,
                })
              }
              checked={searchData?.language === language}
            />
          ))}
        </>
      </MenuSection>
      <MenuSection
        title="Tác giả"
        style={{
          borderTop: "none",
        }}
      >
        <>
          {listAuthor?.map?.((author) => (
            <CheckBox
              id={author?.id}
              label={author?.name}
              value={author?.name}
              onClick={() =>
                setSearchData({
                  author:
                    searchData?.author === author?.name ? "" : author?.name,
                })
              }
              checked={searchData?.author === author?.name}
            />
          ))}
        </>
      </MenuSection>
    </>
  );
};

export default MenuSide;
