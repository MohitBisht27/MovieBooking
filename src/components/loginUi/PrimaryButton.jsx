import React from "react";

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={
        "w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-[1.02] " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
