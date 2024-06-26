import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout'
import HomePage from '../components/HomePage/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllProducts from '../components/AllProducts/AllProducts';
import DeadLinkPage from '../components/DeadLinkPage/DeadLink';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'login', element: <LoginFormPage /> },
      { path: 'signup', element: <SignupFormPage /> },
      { path: 'shop', element: <AllProducts /> },
      {path: '*', element: <DeadLinkPage/> }
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
