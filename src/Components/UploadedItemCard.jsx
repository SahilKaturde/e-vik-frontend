// src/Components/UploadedItemCard.jsx

import React from "react";

const UploadedItemCard = ({ image, status, points }) => {
  return (
    <div className="bg-[#2a2f35] p-4 rounded-xl shadow-md flex flex-col items-center">
      <img
        src={image}
        alt="E-waste"
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <span
        className={`text-sm font-semibold ${
          status === "Approved" ? "text-green-500" : "text-yellow-400"
        }`}
      >
        {status}
      </span>
      <span className="text-xs text-gray-400 mt-1">{points} Points</span>
    </div>
  );
};

export default UploadedItemCard;
