
import axiosInstance from './axiosInstance';

const productsService = {
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/products');
      console.log('I am here')
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

};

export default productsService;
