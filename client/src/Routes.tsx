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
import UpdatePassword from 'pages/auth/UpdatePassword';
import Checkout from 'pages/Checkout/Checkout';
import OrderDetails from 'pages/OrderDetails/OrderDetails';
import Orders from 'pages/Orders/Orders';
import OrdersSummary from 'pages/OrdersSummary/OrdersSummary';
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
    {
      path: '/update-password',
      element: <UpdatePassword />,
    },

    // ADMIN DASHBARD
    {
      path: 'dashboard',
      element:
        userData?.role === 'admin' ? (
          <AdminLayout />
        ) : (
          <Navigate to="/login" replace />
        ),
      children: [
        {
          index: true,
          element: <Dashboard />,
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
        {
          path: 'orders-summary',
          element: <OrdersSummary />,
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
