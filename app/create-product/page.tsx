'use client'
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import productsService from '../../services/productsService';
import axios from 'axios';

const ProductCreationPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (file) {
        const imageUrl = await productsService.uploadImage(file);
        const newProductData = { ...formData, image: imageUrl };
        await productsService.createProduct(newProductData);
        console.log('Product created successfully');
      } else {
        console.error('No file selected for upload');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-4 p-8 bg-white shadow-2xl rounded-lg mt-12 mb-12">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col space-y-4">
            <label htmlFor="title" className="text-lg font-semibold text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product title"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <label htmlFor="description" className="text-lg font-semibold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={5}
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="flex flex-col space-y-4">
            <label htmlFor="price" className="text-lg font-semibold text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product price"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <label htmlFor="image" className="text-lg font-semibold text-gray-700">Image URL</label>
            <input
              type="file"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleFileChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product image URL"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationPage;
