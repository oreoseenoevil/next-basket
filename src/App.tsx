import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserCartContextProvider from './context/UserCart';
import PageLayout from './components/PageLayout';
import Products from './pages/Products';
import ErrorPage from './pages/Error';
import ProductsProvider from './context/Products';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Products />
        },
        {
          path: '/basket',
          element: <Cart />
        },
        {
          path: '/wishlist',
          element: <Wishlist />
        }
      ]
    }
  ]);

  return (
    <ProductsProvider>
      <UserCartContextProvider>
        <RouterProvider router={router} />
      </UserCartContextProvider>
    </ProductsProvider>
  );
}

export default App;
