import React from "react";

const TextInput = ({ icon, className = "", ...inputProps }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        className={
          "w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition " +
          className
        }
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
