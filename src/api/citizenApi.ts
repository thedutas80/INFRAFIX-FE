import { api } from './config';

export const createReport = async (data: {
  title: string;
  description: string;
  province: string;
  city: string;
  street: string;
  postCode: string;
}) => {
  const response = await api.post('/report/create', data);
  return response.data;
};
