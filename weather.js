#!/usr/bin/enu node
import dotenv from 'dotenv';
dotenv.config();

import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import {
  consoleOutput,
  printError,
  printHelp,
  printSuccess,
} from './services/log.service.js';
import {
  TOKEN_DICTIONARY,
  getKey,
  saveCity,
  saveKeyValue,
} from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  const city = (await getKey(TOKEN_DICTIONARY.city)) ?? process.env.CITY;
  try {
    const res = await getWeather(city);
    consoleOutput(res);
  } catch (e) {
    if (e?.response?.status !== 404 && e?.response?.status !== 401) {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.s) {
    return await saveCity(TOKEN_DICTIONARY.city, args.s);
  }
  if (args.h) {
    return printHelp();
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};
initCLI();
