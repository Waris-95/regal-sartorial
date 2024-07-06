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
import StylesDetails from '../components/Wardrobe/StylesDetail';
import Styles from '../components/Wardrobe/Styles';

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
      { path: 'styles/:styleId',
       element: <StylesDetails /> 
      },
      { path: 'styles',
       element: <Styles /> 
      },


      { path: '*', element: <DeadLinkPage/> }
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
