// Inbox.jsx
import React, { useEffect, useState } from "react";
import { getOffers, acceptOffer, rejectOffer } from "../src/services/inboxService";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await getOffers();
        setOffers(data);
      } catch (err) {
        setError("Failed to load offers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleAccept = async (offerId) => {
    try {
      await acceptOffer(offerId);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (err) {
      setError("Failed to accept offer");
      console.error(err);
    }
  };

  const handleReject = async (offerId) => {
    try {
      await rejectOffer(offerId);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (err) {
      setError("Failed to reject offer");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading offers...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Offers</h2>
      
      {offers.length === 0 ? (
        <p className="text-gray-400">No offers found</p>
      ) : (
        <div className="grid gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-[#2b2f33] p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{offer.ewaste.title}</h3>
                  <p className="text-sm text-gray-400">
                    {offer.offer_type === 'received' 
                      ? `From: ${offer.sender.username}` 
                      : `To: ${offer.recipient.username}`}
                  </p>
                  <p className="text-green-400 mt-1">{offer.eco_points} points</p>
                </div>
                <div className="flex gap-2">
                  {offer.offer_type === 'received' && offer.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleAccept(offer.id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleReject(offer.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {offer.status !== 'pending' && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      offer.status === 'accepted' ? 'bg-green-900 text-green-300' : 
                      offer.status === 'rejected' ? 'bg-red-900 text-red-300' : 'bg-gray-700'
                    }`}>
                      {offer.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inbox;