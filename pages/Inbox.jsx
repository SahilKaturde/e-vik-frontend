// Inbox.jsx

import React, { useEffect, useState } from 'react';
import api from '../src/api';

export default function Inbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get('auth/notifications/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setNotifications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const markAsRead = (id) => {
    api
      .patch(`/notifications/${id}/`, { is_read: true }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
      });
  };

  const getHighlightClass = (notif) => {
    const msg = notif.message.toLowerCase();

    if (msg.includes('rejected')) return 'border-l-4 border-red-500 bg-[#2b1f1f]';
    if (msg.includes('approved')) return 'border-l-4 border-green-500 bg-[#1f2b1f]';
    if (notif.notif_type === 'points') return 'border-l-4 border-blue-500 bg-[#1f2632]';
    return 'border border-[#3a4046] bg-[#22272c]';
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 px-4">
        <p className="text-gray-400 text-center text-sm sm:text-base">Loading notifications...</p>
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="flex justify-center items-center py-10 px-4">
        <p className="text-gray-400 text-center text-sm sm:text-base">No notifications found.</p>
      </div>
    );

  return (
    <div className="space-y-4 mt-6 px-4 sm:px-6 md:px-10 max-w-3xl mx-auto">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl shadow-sm sm:shadow-md transition-all duration-300 ${
            n.is_read
              ? 'border border-[#3a4046] bg-[#22272c]'
              : getHighlightClass(n)
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="w-full">
              <p className="text-xs text-gray-400 italic mb-1 sm:mb-2">
                {new Date(n.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-[#f0f0f0] break-words">{n.message}</p>
            </div>
            {!n.is_read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="self-start sm:self-center px-3 py-1 bg-[#3a6b43] hover:bg-[#4a8a55] rounded-lg text-xs font-semibold text-white transition-all"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
