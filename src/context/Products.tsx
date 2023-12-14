import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { getDataAPI } from '../utils';

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

interface ProductContextProps {
  products: Product[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  isLoading: boolean;
}

export const ProductContext = createContext<ProductContextProps>({
  products: [],
  searchValue: '',
  setSearchValue: () => {},
  isLoading: false
});

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const name = useDebounce(searchValue, 500);

  const getProducts = async (value: string) => {
    try {
      const data = await getDataAPI(`https://dummyjson.com/products/search?q=${value}`);

      return data.products;
    } catch (error) {
      return error;
    }
  };

  const query = useQuery({
    queryKey: ['products', name],
    queryFn: () => getProducts(name)
  });

  const products: Product[] = useMemo(() => {
    return query?.data || [];
  }, [query]);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading: query.isLoading,
        searchValue,
        setSearchValue
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
