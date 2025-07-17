// src/services/inboxService.js
import api from '../api';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getOffers = async () => {
  try {
    const response = await api.get('/auth/offers/', getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export const acceptOffer = async (offerId) => {
  try {
    await api.post(`/auth/offers/${offerId}/accept/`, null, getAuthHeader());
  } catch (error) {
    console.error('Error accepting offer:', error);
    throw error;
  }
};

export const rejectOffer = async (offerId) => {
  try {
    await api.post(`/auth/offers/${offerId}/reject/`, null, getAuthHeader());
  } catch (error) {
    console.error('Error rejecting offer:', error);
    throw error;
  }
};

export const sendOffer = async (offerData) => {
  try {
    const response = await api.post('/auth/send-offer/', offerData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error sending offer:', error);
    throw error;
  }
};
