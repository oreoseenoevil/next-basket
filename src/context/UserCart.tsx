import { createContext, useMemo, useReducer, ReactNode, useState } from 'react';
import { Product } from './Products';

interface CartItem extends Product {
  quantity: number;
}

interface UserCartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  changeQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  total: number;
  totalItems: number;
  handleReset: () => void;
  wishlist: Product[];
  addToWishlist: (value: Product) => void;
}

export const UserCartContext = createContext<UserCartContextType>({
  cart: [],
  addToCart: () => {},
  changeQuantity: () => {},
  removeFromCart: () => {},
  total: 0,
  handleReset: () => {},
  totalItems: 0,
  wishlist: [],
  addToWishlist: () => {}
});

type ChangeQuantityPayload = { id: number; quantity: number };

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'CHANGE_QUANTITY'; payload: ChangeQuantityPayload }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'RESET_CART' };

const cartReducer = (state: CartItem[], action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const id = state.findIndex((item) => item.id === action.payload.id);
      const item = state[id];

      let updateItems;

      if (item) {
        const updateItem = {
          ...item,
          quantity: item.quantity! + action.payload.quantity!
        };
        updateItems = [...state];
        updateItems[id] = updateItem;
      } else {
        updateItems = [...state, action.payload];
      }

      return updateItems;
    }
    case 'CHANGE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload.id);

    case 'RESET_CART':
      return [];
    default:
      return state;
  }
};

interface UserCartContextProviderProps {
  children: ReactNode;
}

const UserCartContextProvider = ({ children }: UserCartContextProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    if (!wishlist.some((item_info) => item_info.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + (item.price - item.price * (item.discountPercentage / 100)) * item.quantity!,
      0
    );
  }, [cart]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const changeQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    dispatch({ type: 'CHANGE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_CART' });
  };

  return (
    <UserCartContext.Provider
      value={{
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        total,
        totalItems: cart.reduce((total, item: CartItem) => total + (item.quantity ?? 0), 0) as number,
        handleReset,
        wishlist,
        addToWishlist
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export default UserCartContextProvider;
