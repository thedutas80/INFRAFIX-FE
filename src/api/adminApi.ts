import { api } from './config';

export const createTechnician = async (data: any) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post('/adminuser/create-technician', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};


export const deleteUser = async (id: number | string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getAllReports = async () => {
  try {
    const response = await api.get('/report/all');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const updateReportStatus = async (id: number | string, statusId: number) => {
  try {
    const response = await api.put(`/report/${id}/status/${statusId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};


export const deleteReport = async (id: number | string) => {
  try {
    const response = await api.delete(`/report/delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getReportById = async (id: number | string) => {
  try {
    const response = await api.get(`/report/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

