'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import productsService from '../services/productsService';
import styles from '../public/style/productList.css'

const ProductList = () => {
  const { isLoading, isError, data: products } = useQuery('products', productsService.getAllProducts);

  if (isLoading) return <div className='p-8 bg-gray-100 min-h-screen '>Loading...</div>;
  if (isError) return <div className='bg-white p-8 min-h-screen '>Error fetching data</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <a href='/create-product'>
          <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create Product
          </button>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 bg-white shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 text-center">
            <h2 className="text-xl font-semibold mb-2 truncate">{product.title}</h2>
            <p className="mb-4 text-sm text-gray-700 overflow-hidden overflow-ellipsis h-16">{product.description}</p>
            <div className="flex justify-center mb-4">
              <img src={product.image} alt={product.title} className="w-32 h-32" />
            </div>
            <div className="bg-gray-100 border rounded p-2 inline-block">
              <p className="font-bold">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;