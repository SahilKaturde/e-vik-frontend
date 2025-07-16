import React, { useEffect, useState, useRef } from "react";
import api from "../src/api";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRewards, setShowRewards] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [leaderRes, rewardRes] = await Promise.all([
          api.get("auth/leaderboard/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("auth/rewards/all/", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        setLeaderboardData(leaderRes.data);
        setRewards(rewardRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (leaderboardData.length > 0 && rewards.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const userLabels = leaderboardData.map(user => user.username);
      const rewardLabels = rewards.map(reward => reward.name);

      const allLabels = [...new Set([...userLabels, ...rewardLabels])];

      const userData = allLabels.map(label => {
        const user = leaderboardData.find(u => u.username === label);
        return user ? user.eco_points : null;
      });

      const rewardData = allLabels.map(label => {
        const reward = rewards.find(r => r.name === label);
        return reward ? reward.eco_points_required : null;
      });

      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: allLabels,
          datasets: [
            {
              label: 'User Eco Points',
              data: userData,
              backgroundColor: 'rgba(84, 157, 255, 0.2)',
              borderColor: 'rgba(84, 157, 255, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(84, 157, 255, 1)',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
              tension: 0.3,
              fill: false
            },
            {
              label: 'Reward Thresholds',
              data: rewardData,
              backgroundColor: 'rgba(255, 183, 77, 0.2)',
              borderColor: 'rgba(255, 183, 77, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 183, 77, 1)',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
              tension: 0.3,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'User Eco Points vs Reward Thresholds',
              color: '#ffffff',
              font: { size: window.innerWidth < 768 ? 14 : 16 }
            },
            legend: {
              labels: {
                color: '#ffffff',
                font: { size: 12 }
              }
            },
            tooltip: {
              backgroundColor: '#2a2f35',
              titleColor: '#ffb347',
              bodyColor: '#ffffff',
              borderColor: '#549DFF',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#ffffff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
              ticks: {
                color: '#ffffff',
                maxRotation: window.innerWidth < 768 ? 45 : 0,
                font: { size: 10 },
                autoSkip: true,
                maxTicksLimit: 10
              },
              grid: { color: 'rgba(255, 255, 255, 0.1)', display: false }
            }
          }
        }
      });
    }
  }, [leaderboardData, rewards]);

  const toggleRewards = () => {
    setShowRewards(!showRewards);
  };

  return (
    <div className="min-h-screen bg-[#212529] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Eco Warriors Leaderboard</h2>

        {/* 1. Top Contributors */}
        <div className="bg-[#2a2f35] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-[#ffb347] mb-4">Top Eco Contributors</h3>
          {loading ? (
            <div className="flex justify-center py-8 md:py-12">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#ffb347]"></div>
            </div>
          ) : leaderboardData.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.username} 
                  className={`flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl transition-all hover:scale-[1.01] ${
                    index === 0 ? "bg-gradient-to-r from-[#ffd700]/20 to-[#ffb347]/20 border-2 border-[#ffb347]" : 
                    index === 1 ? "bg-gradient-to-r from-[#c0c0c0]/20 to-[#d3d3d3]/20 border-2 border-[#c0c0c0]" :
                    index === 2 ? "bg-gradient-to-r from-[#cd7f32]/20 to-[#b87333]/20 border-2 border-[#b87333]" :
                    "bg-[#343a40] hover:bg-[#3d444c]"
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative">
                      <img
                        src={user.profile_pic}
                        alt={user.username}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#ffb347] object-cover"
                      />
                      {index < 3 && (
                        <div className={`absolute -top-1 -left-1 md:-top-2 md:-left-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? "bg-[#ffd700]" :
                          index === 1 ? "bg-[#c0c0c0]" :
                          "bg-[#cd7f32]"
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm md:text-lg truncate max-w-[100px] md:max-w-none">{user.username}</p>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
                        <span className="text-xs md:text-sm text-gray-300">Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8fd19e] font-bold text-lg md:text-xl">{user.eco_points}</span>
                    <img src="/assets/ecop.png" alt="Eco Points" className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-6 md:py-8 text-sm md:text-base">No leaderboard data available.</p>
          )}
        </div>

        {/* 2. Graph */}
        <div className="bg-[#2a2f35] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="h-64 md:h-80">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* 3. Rewards */}
        <div className="bg-[#2a2f35] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleRewards}
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#ffb347] mb-0">Available Rewards</h3>
            <div className="transition-transform duration-300 transform">
              <svg 
                className={`w-6 h-6 text-[#ffb347] transition-transform duration-300 ${showRewards ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${showRewards ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className={`pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${showRewards ? 'block' : 'hidden'}`}>
              {rewards.map(reward => (
                <div key={reward.id} className="bg-[#343a40] rounded-lg p-4 shadow-md">
                  <img src={reward.image} alt={reward.name} className="w-full h-40 object-cover rounded mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-1">{reward.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{reward.description}</p>
                  <span className="text-sm text-[#8fd19e] font-semibold">{reward.eco_points_required} Eco Points</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;