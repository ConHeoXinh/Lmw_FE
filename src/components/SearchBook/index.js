import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import MenuSide from "./Components/MenuSide";
import ContentSide from "./Components/ContentSide";

const SearchBooksPage = () => {
  const [searchData, setSearchData] = useState({
    title: "",
    category: "",
    language: "",
    author: "",
    publisher: "",
  });
  return (
    <>
      <MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="d:col-span-1 pt-36 ml-2.5 mr-2.5 pl-0 2xl:pl-32">
            <MenuSide searchData={searchData} setSearchData={setSearchData} />
          </div>
          <div className="md:col-span-3">
            <ContentSide searchData={searchData} />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SearchBooksPage;
