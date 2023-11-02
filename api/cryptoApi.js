import axios from 'axios';

const BASE_URL = 'https://criptoya.com/api';

export const fetchCryptoExchangeData = async (exchange, coin, fiat, volume) => {
  try {
    const response = await axios.get(`${BASE_URL}/${exchange}/${coin}/${fiat}/${volume}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${exchange}`, error);
    return null;
  }
};

