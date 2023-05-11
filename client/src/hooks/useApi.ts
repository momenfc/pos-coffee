import axios from 'axios';
// import { useProgress } from 'components/own/OwnProgress';
import { useTranslation } from 'react-i18next';
import tokenStorage from 'services/storage/tokenStorage';

//  START FUNCTION
function useApi(config = {}) {
  const { i18n } = useTranslation();
  // const { onUploadProgress } = useProgress();

  // const {  } = useProgress();
  // const onUploadProgress = (progressEvent) => {
  //   const { loaded, total } = progressEvent;
  //   let percent = Math.floor((loaded * 100) / total);
  //   if (percent < 100) {
  //     console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
  //   }
  // };
  // const token = localStorage.getItem('access_token');
  const token = tokenStorage.getToken();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'content-language': i18n.resolvedLanguage,
      withCredentials: true,
    },
    // onUploadProgress: config.isUpload ? onUploadProgress : undefined,
    ...config,
  });

  // ############################
  async function get(route: string) {
    const { data } = await axiosInstance.get(route);
    return data;
  }

  async function post(route: string, body: {}) {
    const { data } = await axiosInstance.post(route, body);
    return data;
  }

  async function put(route: string, body: {}) {
    const { data } = await axiosInstance.put(route, body);
    return data;
  }

  async function patch(route: string, body: {}) {
    const { data } = await axiosInstance.patch(route, body);
    return data;
  }

  async function del(route: string) {
    const { data } = await axiosInstance.delete(route);
    return data;
  }

  // ############################
  return { get, post, put, patch, delete: del };
}

export default useApi;
