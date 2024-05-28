import React from "react";
import { BookCardV2 } from "../../BookCard";
import { useNavigate } from "react-router-dom";

const ReleatedBooks = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {data?.map((item) => (
          <BookCardV2
            item={item}
            handleTitleOnClick={() => {
              navigate(`/book-detail?id=${item?.id}`);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ReleatedBooks;
