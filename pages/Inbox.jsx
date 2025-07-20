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
      <div className="flex justify-center py-10">
        <p className="text-gray-400">Loading notifications...</p>
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-400">No notifications found.</p>
      </div>
    );

  return (
    <div className="space-y-4 mt-6 px-4">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl shadow-md transition-all duration-300 ${
            n.is_read
              ? 'border border-[#3a4046] bg-[#22272c]'
              : getHighlightClass(n)
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 italic mb-2">
                {new Date(n.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-[#f0f0f0]">{n.message}</p>
            </div>
            {!n.is_read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="ml-4 px-3 py-1 bg-[#3a6b43] hover:bg-[#4a8a55] rounded-lg text-xs font-semibold"
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
