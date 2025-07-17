// src/components/EwasteList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { X } from "lucide-react";

function EwasteList() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchEwaste = async () => {
      try {
        const response = await api.get("/auth/e-waste/list/");
        setItems(response.data);
      } catch (err) {
        console.error(
          "Failed to load ewaste items:",
          err.response?.data || err.message
        );
      }
    };
    fetchEwaste();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8 text-white px-4">
      {selectedItem ? (
        <div className="relative bg-[#1e1f24] p-6 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 bg-[#383a40] text-white rounded-full p-2 hover:bg-[#4a4c53] transition duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            className="w-full h-52 sm:h-64 object-cover rounded-xl mb-5 shadow-md"
          />

          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {selectedItem.title}
          </h2>
          <p className="text-gray-300 mb-3">{selectedItem.description}</p>
          <p className="text-gray-400 text-sm sm:text-base">
            📍 Address: {selectedItem.address}
          </p>

          <div className="flex items-center gap-3 mt-4">
            {selectedItem.profile_pic ? (
              <img
                src={selectedItem.profile_pic}
                alt="Profile"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#6EA8FE] shadow-md"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-600 flex items-center justify-center text-xl text-white border-2 border-gray-500">
                ?
              </div>
            )}
            <div>
              <p className="text-gray-300 text-sm sm:text-base font-semibold">
                {selectedItem.posted_by || "Unknown"}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Global Contributor
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center">No E-Waste items found.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer bg-[#1e1f24] hover:bg-[#2a2c31] transition rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 hover:scale-[1.01] duration-200"
              >
                <div className="w-full sm:w-24 sm:h-24 h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex flex-col justify-between w-full sm:w-auto flex-1 text-center sm:text-left">
                  <p className="text-white font-semibold text-lg truncate">
                    {item.title}
                  </p>

                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
                    {item.profile_pic ? (
                      <img
                        src={item.profile_pic}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border border-gray-500"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-sm text-white">
                        ?
                      </div>
                    )}
                    <p className="text-gray-400 text-sm">
                      {item.posted_by || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EwasteList;