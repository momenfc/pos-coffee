import { QueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { t } from 'i18next';

const onErrorHandler = (error: any) => {
  console.log('onErrorHandler  error:', { error });
  const code = error?.response?.status;
  console.log('onError Global code is ', code, +'/' + error);
  if (code === 401) {
    message.warning(t('Please login before taking this action'));
    console.log('onErrorHandler  before taking this action:');
    localStorage.clear();
    window.location.replace('/auth?action=login');

    return null;
  }

  if (code >= 400 || code < 500) {
    const errMsg = error?.response?.data?.message || error.message;
    message.error(errMsg);
  } else {
    message.error(
      t(
        "We're sorry. Something went wrong. A team of highly trained developers has been dispatched to handle this situation!"
      )
    );
  }
  return error;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      retry: 2,
      onSuccess: (res: any) => {
        console.log('onSuccess Global queries', res);
        if (res?.code !== 200) {
          message.success(res?.message);
        }
        if (res?.validation) {
          res.validation?.forEach((err: string) => {
            message.error(err);
          });
        }
      },
      onError: onErrorHandler,
      networkMode: 'always',
    },
    mutations: {
      onSuccess: (res: any) => {
        console.log('onSuccess Global mutations', res);
        if (res?.code === 200) {
          message.success(res?.message);
        }
        if (res?.validation) {
          res.validation?.forEach((err: string) => {
            // message.error(err, { autoClose: false })
            message.error(err);
          });
        }
      },
      onError: onErrorHandler,
      // networkMode: 'always',
    },
  },
});

export default queryClient;
