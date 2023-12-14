import { useContext } from 'react';
import { ProductContext } from '../context/Products';

const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};

export default useProducts;
