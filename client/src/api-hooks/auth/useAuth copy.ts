import { message } from 'antd';
import useApi from 'hooks/useApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenStorage from 'services/storage/tokenStorage';
import { useAppDispatch, useAppSelector } from 'services/store/configureStore';
import { setUserData } from 'services/store/reducers/user';

function useAuth() {
  const navigate = useNavigate();
  const api = useApi();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(s => s.cart);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  type Callback = (res: {}) => void;

  const fetchFun = async (url: string, data: object) => {
    try {
      setAuthLoading(true);
      const res = await api.post(url, data);
      setAuthLoading(false);
      return res;
    } catch (error: any) {
      console.log('signin  error:', error);
      setAuthLoading(false);
      message.error(error?.response?.data?.message);

      Object.values(error?.response?.data?.error?.errors).forEach(
        (value: any) => {
          if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null
          ) {
            message.error(value?.message);
          }
        }
      );
    }
  };

  const signin = async (data: SigninData) => {
    const res = await fetchFun('/users/login', data);
    if (res?.status === 'success') {
      tokenStorage.setToken(res.token);
      dispatch(setUserData(res.data.user));
      message.success(`welcome back ${res.data.user.name}`);
      navigate('/');
    }
    return res;
  };

  const register = async (data: RegisterData, callback?: Callback) => {
    const res = await fetchFun('/users/register', data);
    if (res?.status === 'success') {
      tokenStorage.setToken(res.token);
      dispatch(setUserData(res.data.user));
      message.success('Account created succesfuly');
      navigate('/');
    }
    return res;
  };

  const signOut = async (callback?: Callback) => {
    console.log(cart);
    if (cart.items.length) {
      message.warning('Empty your cart first');
      if (callback) callback({});
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      tokenStorage.clearToken();
      dispatch(setUserData(null));
      message.success('You are signed out');
      navigate('/login', { replace: true });
      setAuthLoading(false);
      if (callback) callback({});
    }, 1500);
  };
  const forgetPass = async (data: ForgetPassData, callback?: Callback) => {
    const res = await fetchFun('/users/forget-password', data);
    if (res?.status === 'success') {
      message.success('Code sent to your email succesfuly');
      navigate('/reset-password');
    }
    return res;
  };
  const resetPass = async (data: resetPassData, callback?: Callback) => {
    const res = await fetchFun('/users/reset-password', data);
    if (res?.status === 'success') {
      tokenStorage.setToken(res.token);
      dispatch(setUserData(res.data.user));
      message.success('Password reset succesfuly');
      navigate('/');
    }
    return res;
  };

  return { signin, signOut, register, forgetPass, resetPass, authLoading };
}

export default useAuth;
