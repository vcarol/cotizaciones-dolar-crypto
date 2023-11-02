// dolarApi.js

import axios from 'axios';

export const fetchDollarData = async () => {
  try {
    const response = await axios.get('https://criptoya.com/api/dolar');
    const {
      oficial,
      mep,
      blue,
      ccl,
    } = response.data;
    
    return { oficial, mep, blue, ccl };
  } catch (error) {
    console.error('Error fetching dollar data:', error);
    return null;
  }
};