import OwnLayout from 'components/layout/OwnLayout';
import AdminLayout from 'pages/admin/AdminLayout/AdminLayout';
import Dashboard from 'pages/admin/Dashboard/Dashboard';
import Products from 'pages/admin/Products/Products';
import Staff from 'pages/admin/Staff/Staff';
import Stock from 'pages/admin/Stock/Stock';
import EnterEmail from 'pages/auth/EnterEmail';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import Checkout from 'pages/Checkout/Checkout';
import OrderDetails from 'pages/OrderDetails/OrderDetails';
import Orders from 'pages/Orders/Orders';
import { Navigate, useRoutes } from 'react-router-dom';
import { useAppSelector } from 'services/store/configureStore';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function RoutesWrapper() {
  const userData = useAppSelector(s => s.user.data);

  const routes = useRoutes([
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/',
      element: userData ? <OwnLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: <Orders />,
            },
            {
              path: ':orderId',
              element: <OrderDetails />,
            },
          ],
        },

        // AUTHENTICATION
        // {
        //   path: '/auth',
        //   children: [
        //     {
        //       index: true,
        //       element: <Auth />,
        //     },
        //     {
        //       path: 'enter-email',
        //       element: <EnterEmail />,
        //     },
        //     {
        //       path: 'enter-code',
        //       element: <EnterCode />,
        //     },
        //     {
        //       path: 'reset-password',
        //       element: <ResetPassword />,
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/enter-email/:action',
      element: <EnterEmail />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },

    // ADMIN DASHBARD
    {
      path: 'dashboard',
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'stock',
          element: <Stock />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'staff',
          element: <Staff />,
        },
      ],
    },
  ]);
  return routes;
}

export default RoutesWrapper;
