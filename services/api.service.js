import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { printError } from './log.service.js';
import { getKey, TOKEN_DICTIONARY } from './storage.service.js';

export const getWeather = async (city) => {
  const apiKey = (await getKey(TOKEN_DICTIONARY.token)) ?? process.env.TOKEN;

  if (!apiKey) {
    throw new Error('token is UNDEFINED, set -t');
  }

  const cityURL = new URL('http://api.openweathermap.org/geo/1.0/direct');
  const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather');
  try {
    const { data } = await axios.get(cityURL, {
      params: {
        q: city,
        limit: 1,
        appId: apiKey,
      },
    });
    if (!data.length) {
      console.log(data);
      printError('Неверно указан город');
      return;
    }

    const { lat, lon } = data[0];
    const res = await axios.get(weatherURL, {
      params: {
        lat,
        lon,
        appId: apiKey,
        lang: 'ru',
        units: 'metric',
      },
    });
    return res.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      printError('Неверно указан токен');
    }
  }
};
