import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu API

export const getProducts = () => {
  return axios.get(`${API_URL}/productos`);
};

export const addProduct = (productData) => {
  return axios.post(`${API_URL}/productos`, productData);
};

export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}/productos/${productId}`);
};

export const getManufacturers = () => {
  return axios.get(`${API_URL}/fabricantes`);
};

export const addManufacturer = (fabricanteData) => {
  return axios.post(`${API_URL}/fabricantes`, fabricanteData);
};

export const deleteManufacturer = (manufacturerId) => {
  return axios.delete(`${API_URL}/fabricantes/${fabricanteId}`);
};
