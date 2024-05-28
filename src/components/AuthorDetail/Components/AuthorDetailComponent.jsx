import React from "react";
import ReadMore from "../../../layout/ReadMore";

const AuthorDetailComponent = ({ item }) => {
  return (
    <>
      <div className="flex flex-wrap gap-8">
        <div className="w-[30%] ml-[20px]">
          <img
            className="w-[100%] object-cover rounded-[50px]"
            src={item?.imageUrl}
            alt={item?.name}
          />
        </div>
        <div className="ml-[20px] w-[60%] flex gap-10">
          <div>
            <p>
              Tác giả:
              <span className="text-cyan-600 ml-[10px]">{item?.name}</span>
            </p>
          </div>
        </div>
        <div className="w-[100%] mx-[20px]">
          <p className="text-center bg-gray-100 py-[15px] font-bold mb-[10px]">
            Mô tả tác giả - {item?.name}
          </p>
          <ReadMore data={item?.description} />
        </div>
      </div>
    </>
  );
};

export default AuthorDetailComponent;
