// src/Components/RewardCard.jsx

import React from "react";

const RewardCard = ({ reward, onRedeem, isDisabled }) => {
  return (
    <div className="bg-[#2a2f35] rounded-xl p-4 shadow-lg flex flex-col justify-between">
      <img
        src={reward.image}
        alt={reward.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{reward.name}</h3>
      <p className="text-gray-400 text-sm mt-1">{reward.description}</p>
      <p className="text-green-300 mt-2 font-semibold">
        {reward.eco_points_required} Eco Points
      </p>
      <button
        onClick={() => onRedeem(reward.id)}
        disabled={isDisabled}
        className={`mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition ${
          isDisabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isDisabled ? "Insufficient Points" : "Redeem"}
      </button>
    </div>
  );
};

export default RewardCard;
