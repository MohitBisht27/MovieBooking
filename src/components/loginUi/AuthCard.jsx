import React from "react";

const AuthCard = ({ title, children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default AuthCard;
