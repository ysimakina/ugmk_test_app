import axios from 'axios';

import { FactoryData } from '../types';

const BASE_URL = 'http://localhost:3001/products';

export const fetchFactoriesData = async (): Promise<FactoryData[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const fetchDetailsFactoryData = async (
  factoryId: string,
  monthNumber: string
): Promise<FactoryData> => {
  const response = await axios.get<FactoryData>(
    `${BASE_URL}/${factoryId}/${monthNumber}`
  );

  return response.data;
};
