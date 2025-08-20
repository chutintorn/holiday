// src/services/flightService.js
import axios from 'axios';

const API_BASE_URL = 'https://nodebasic-production.up.railway.app/flights';
//const API_BASE_URL = 'http://localhost:3100/flights';
/**
 * Get available flights
 * @param {Object} params - Flight search parameters
 * @returns {Promise<Object>} - API response data
 */
export const getAvailableFlights = async (params = {}) => {
  const payload = {
    agencyCode: "",
    currency: params.currency ?? 'THB',
    adult: params.adult ?? 1,
    child: params.child ?? 0,
    infant: params.infant ?? 0,
    journeys: params.journeys ?? [{
      origin: 'DMK',
      destination: 'CNX',
      departureDate: '2025-05-26'
    }]
  };

  try {
    const response = await axios.post(API_BASE_URL, payload );
    return response.data;
  } catch (error) {
    console.error('❌ Flight API error:', error?.response?.data || error.message);
    throw error;
  }
};
