import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Store() {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [redeemMessage, setRedeemMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [rewardsRes, pointsRes] = await Promise.all([
          api.get("/auth/rewards/all/", { headers }),
          api.get("/auth/me/", { headers }),
        ]);

        setRewards(rewardsRes.data);
        const points =
          pointsRes.data.items?.reduce((acc, item) => acc + (item.points || 0), 0) || 0;
        setUserPoints(points);
      } catch (err) {
        console.error("Error loading store data:", err);
      }
    };

    fetchData();
  }, [token]);

  const redeemReward = async (rewardId, requiredPoints) => {
    if (userPoints < requiredPoints) {
      setRedeemMessage("You don't have enough Eco Points to redeem this reward.");
      return;
    }

    try {
      const res = await api.post(
        `/auth/rewards/redeem/${rewardId}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRedeemMessage(res.data.message);
      const pointsRes = await api.get("/auth/me/", { headers });
      const points =
        pointsRes.data.items?.reduce((acc, item) => acc + (item.points || 0), 0) || 0;
      setUserPoints(points);
    } catch (err) {
      setRedeemMessage(err.response?.data?.error || "Redemption failed");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: "#212529", color: "#f8f9fa" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Reward Store</h1>
          <div className="flex items-center gap-2 text-green-400 text-lg font-medium">
            <img src="/assets/ecop.png" alt="Eco Points" className="w-6 h-6" />
            {userPoints} Points
          </div>
        </div>

        {redeemMessage && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              redeemMessage.includes("Success")
                ? "bg-green-700 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {redeemMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-[#343a40] text-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={reward.image || "/assets/placeholder.png"}
                alt={reward.name}
                onError={(e) => (e.target.src = "/assets/placeholder.png")}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{reward.name}</h3>
                <p className="text-gray-300 mb-3 text-sm">{reward.description}</p>

                <div className="flex justify-between items-center">
                  <span className="flex items-center text-yellow-400 font-medium text-sm">
                    <img src="/assets/ecop.png" alt="Points" className="w-5 h-5 mr-1" />
                    {reward.eco_points_required} Points
                  </span>

                  <button
                    onClick={() => redeemReward(reward.id, reward.eco_points_required)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                      userPoints >= reward.eco_points_required
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-700 text-gray-400 cursor-default"
                    }`}
                  >
                    {userPoints >= reward.eco_points_required ? "Redeem" : "Not Enough"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
