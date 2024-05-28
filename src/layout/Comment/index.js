import React from "react";
import StarRating from "../StarRating";
import defaultAvatar from "../../assesets/images/defaultAvatar.jpg";
const CommentRating = ({ starValue, label, ...props }) => {
  return (
    <>
      <div className="flex">
        <div className="w-[50%]">
          <p>{label}</p>
        </div>
        <div className="w-[50%]">
          <StarRating value={starValue} />
        </div>
      </div>
    </>
  );
};

const CommentPerson = ({ data, ...props }) => {
  return (
    <>
      <div className="flex gap-10 mt-[5px]">
        <div>
          <img
            src={data?.avatar || defaultAvatar}
            className="w-[50px] h-[50px]"
            alt="avatar"
          />
        </div>
        <div>
          <p className="text-cyan-400">{data?.userName}</p>
          <p>{data?.date}</p>
        </div>
      </div>
    </>
  );
};
const Comment = ({ commentData, ...props }) => {
  return (
    <>
      <div className="flex gap-10 flex-col sm:flex-row ml-[10px] sm:ml-[0px] mb-[50px]">
        <div className="w-[70%] sm:w-[25%]">
          <CommentRating label="Overall" value={commentData?.overall} />
          <CommentRating label="Performance" value={commentData?.performance} />
          <CommentRating label="Story" value={commentData?.story} />
          <CommentPerson data={commentData.personInfor} />
        </div>
        <div className="w-[100%] sm:w-[70%]">
          <h3 className="font-bold italic mb-[10px]">{commentData?.title}</h3>
          <p className={`line-clamp-${4} mb-[20px]`}>{commentData?.content}</p>
          <p>{commentData?.countPeople || 0} people found this helpfull</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
