import React from "react";

const Section = ({ title, underline = true, children, ...props }) => {
  return (
    <>
      <div className="max-w-[960px] mx-auto relative pb-[20px]">
        <div className="px-4 py-8 mb-[30px]">
          <h2 className="text-3xl pt-6 text-center font-semibold text-sky-950 mt-20 cardo">
            {title}
          </h2>
          {underline && (
            <hr className="mx-auto bg-yellow-400 w-[50px] h-[2.5px]" />
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Section;
