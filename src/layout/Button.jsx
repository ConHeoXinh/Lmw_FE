import React from "react";

const Button = (props) => {
  return (
    <div>
      {/* <button className=" bg-yellow-500 py-2 px-5 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-brightGreen hover:text-white transition-all">
        {props.title}
      </button> */}
      <button class="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-orange-200 to-red-500 text-white">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
