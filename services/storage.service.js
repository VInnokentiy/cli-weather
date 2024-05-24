import { promises } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const dir = join(homedir(), 'weather.json');

export const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
};

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(dir)) {
    const file = await promises.readFile(dir);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(dir, JSON.stringify(data));
};

export async function getKey(key) {
  if (await isExist(dir)) {
    const file = await promises.readFile(dir);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

export const saveCity = async (key, value) => {
  let data = {};
  if (await isExist(dir)) {
    const file = await promises.readFile(dir);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(dir, JSON.stringify(data));
};

async function isExist(path) {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}
