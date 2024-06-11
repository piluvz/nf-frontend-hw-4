import axios from 'axios';
import axiosInstance from './axiosInstance';

const productsService = {
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await axiosInstance.post('/products', productData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating product');
    }
  },

  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.location;
    } catch (error) {
      throw new Error('Error uploading image');
    }
  },

};

export default productsService;
