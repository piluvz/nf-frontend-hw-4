'use client'
import React from 'react';
import { QueryClient, QueryClientProvider} from 'react-query';
import ProductList from '../components/Products';
import ProductCreationPage from './create-product/page';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
};

export default App;