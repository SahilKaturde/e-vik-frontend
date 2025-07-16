import React, { useEffect, useState } from "react";
import api from "../src/api";
import UploadedItemCard from "../src/Components/UploadedItemCard";
import { useNavigate } from "react-router-dom";


function Settings() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("uploads"); // uploads | transactions
  const [loading, setLoading] = useState(true);
  const [redeemMessage, setRedeemMessage] = useState("");
  const [expandedItemId, setExpandedItemId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, itemRes, transactionRes] = await Promise.all([
          api.get("/auth/me/", { headers }),
          api.get("/auth/e-waste/user/", { headers }),
          api.get("/auth/eco/transactions/", { headers }),
        ]);

        setUser(userRes.data);
        setItems(itemRes.data);
        setTransactions(transactionRes.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  


  const totalPoints = items.reduce((acc, item) => acc + item.points, 0);

  return (
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6 font-mono">Profile Settings</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading profile...</p>
        ) : user ? (
          <>
            {/* Profile Info */}
            <div className="bg-[#2b2f33] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="flex items-center gap-4">
                <img
                  src={user.profile_pic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#8fd19e] object-cover"
                />
                <div>
                  <p className="text-2xl font-bold">{user.username}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 italic">{user.address}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <img src="/assets/ecop.png" alt="Eco Points" className="w-5 h-5" />
                    <span className="text-[#a4f2b1] font-semibold text-lg">
                      {totalPoints} Eco Points
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Logout
                </button>

                
                {redeemMessage && (
                  <p className="text-sm text-yellow-400 mt-1">{redeemMessage}</p>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-8 border-b border-gray-600 pb-2">
              <button
                className={`px-4 py-1 rounded-t-md text-sm font-semibold ${
                  activeTab === "uploads"
                    ? "bg-gray-800 text-green-300"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("uploads")}
              >
                Your Uploaded E-Waste
              </button>
              
            </div>

            {/* Tab Content */}
            {activeTab === "uploads" && (
              <div>
                {items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#22272c] p-4 rounded-xl shadow hover:shadow-xl transition duration-300 cursor-pointer"
                        onClick={() =>
                          setExpandedItemId(expandedItemId === item.id ? null : item.id)
                        }
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="mt-3 space-y-1">
                          <p className="text-lg font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-400 capitalize">{item.status}</p>
                          <p className="text-sm text-green-400 font-bold">
                            {item.points} points
                          </p>
                          {expandedItemId === item.id && (
                            <p className="text-sm text-gray-300 mt-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No e-waste items uploaded yet.</p>
                )}
              </div>
            )}

            
          </>
        ) : (
          <p className="text-center text-red-500">Failed to load user data. <br />plz do login</p>
        )}
      </div>
    </div>
  );
}

export default Settings;
