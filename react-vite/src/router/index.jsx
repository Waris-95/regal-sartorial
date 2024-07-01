import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllProducts from '../components/AllProducts/AllProducts';
import DeadLinkPage from '../components/DeadLinkPage/DeadLink';
import ProductPage from '../components/ProductsPage/ProductsPage'; 
import NewArrivals from '../components/NewCollections/NewCollection';
import Favorites from '../components/Favorites/Favorite';
import Cart from '../components/Cart/Cart';
import ShippingPage from '../components/ShippingPage/ShippingPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [

      { path: '/',
       element: <HomePage /> 
      },
      { path: 'login',
       element: <LoginFormPage />
       },
      { path: 'signup',
       element: <SignupFormPage /> 
      },
      { path: 'shop',
       element: <AllProducts /> 
      },
      { path: 'shop/:id',
       element: <ProductPage /> 
      },
      { path: 'new-arrivals',
       element: <NewArrivals /> 
      },
      { path: 'favorites',
       element: <Favorites /> 
      },
      { path: 'checkout',
       element: <Cart /> 
      },
      { path: 'shipping',
       element: <ShippingPage /> 
      },


      { path: '*', element: <DeadLinkPage/> }
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
