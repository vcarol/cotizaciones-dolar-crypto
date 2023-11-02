import axios from 'axios';

const BASE_URL = 'https://dolarapi.com/v1/dolares/';

export const fetchDolarData = async (type) => {
  try {
    const response = await axios.get(BASE_URL + type);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching dollar data:', error);
    return null;
  }
};