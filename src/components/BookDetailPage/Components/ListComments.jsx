import React from "react";
import Comment from "../../../layout/Comment";

const ListCommenst = () => {
  const commentMockData = [
    {
      title: "A Clear conversation",
      content:
        "Đoạn văn 500 ký tự Cuộc sống là một hành trình, và mỗi người là một hành khách trên hành trình đó. Chúng ta sinh ra, lớn lên, trưởng thành, và rồi ra đi. Trong suốt hành trình, chúng ta sẽ gặp gỡ những người khác, học hỏi những điều mới, và trải nghiệm những cảm xúc khác nhau.Cuộc sống có thể mang đến cho chúng ta những điều tốt đẹp và những điều xấu xa. Có những lúc chúng ta sẽ cảm thấy hạnh phúc, và có những lúc chúng ta sẽ cảm thấy đau khổ. Nhưng dù thế nào đi nữa, chúng ta cũng phải tiếp tục bước đi.Cuộc sống là một món quà, và chúng ta nên trân trọng nó. Chúng ta nên sống hết mình, tận hưởng những khoảnh khắc đẹp đẽ, và học hỏi từ những sai lầm của mình. Chúng ta cũng nên giúp đỡ người khác, và làm cho thế giới trở nên tốt đẹp hơn.",
      countPeople: 9,
      personInfor: {
        userName: "test12",
        date: "10-10-23",
      },
    },
    {
      title: "A Clear conversation v2",
      content:
        "Đoạn văn 500 ký tự Cuộc sống là một hành trình, và mỗi người là một hành khách trên hành trình đó. Chúng ta sinh ra, lớn lên, trưởng thành, và rồi ra đi. Trong suốt hành trình, chúng ta sẽ gặp gỡ những người khác, học hỏi những điều mới, và trải nghiệm những cảm xúc khác nhau.Cuộc sống có thể mang đến cho chúng ta những điều tốt đẹp và những điều xấu xa. Có những lúc chúng ta sẽ cảm thấy hạnh phúc, và có những lúc chúng ta sẽ cảm thấy đau khổ. Nhưng dù thế nào đi nữa, chúng ta cũng phải tiếp tục bước đi.Cuộc sống là một món quà, và chúng ta nên trân trọng nó. Chúng ta nên sống hết mình, tận hưởng những khoảnh khắc đẹp đẽ, và học hỏi từ những sai lầm của mình. Chúng ta cũng nên giúp đỡ người khác, và làm cho thế giới trở nên tốt đẹp hơn.",
      countPeople: 9,
      personInfor: {
        userName: "test12",
        date: "10-10-23",
      },
    },
  ];
  return (
    <>
      {commentMockData?.map?.((commentData) => (
        <Comment commentData={commentData} />
      ))}
    </>
  );
};

export default ListCommenst;
