import { useContext } from 'react';
import { UserCartContext } from '../context/UserCart';

const useUserCart = () => {
  const context = useContext(UserCartContext);

  if (!context) {
    throw new Error('useUserCart must be within a UserCartContextProvider');
  }

  return context;
};

export default useUserCart;
