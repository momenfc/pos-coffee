import QueryProvider from 'services/react-query';
import { ConfigProvider, App as AntApp, FloatButton } from 'antd';
// import 'styles/global.scss';
import 'styles/index.scss';
import RoutesWrapper from './Routes';
import arEG from 'antd/es/locale/ar_EG';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import uts from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import 'dayjs/esm/locale/ar';
import 'dayjs/esm/locale/en';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/common/ScrollToTop';
import InvoiceCopy from 'components/InvoiceCopy/InvoiceCopy';

dayjs.extend(duration);
dayjs.extend(uts);

function App() {
  const { i18n } = useTranslation();

  dayjs.locale(i18n.resolvedLanguage);

  const validateMessages = {
    required: `please input field data`,
  };
  const isEnlish = i18n.resolvedLanguage === 'en';
  return (
    <QueryProvider>
      <ConfigProvider
        direction={isEnlish ? 'ltr' : 'rtl'}
        locale={i18n.resolvedLanguage === 'en' ? enUS : arEG}
        theme={{
          token: {
            colorPrimary: '#006AFF',
            // colorPrimary: '#FF9494',
            // colorLinkHover: '#FFD1D1',
            // colorLink: '#FF9494',
            // colorBgContainer: '#f7f7f7',
            borderRadius: 4,
            fontSize: 16,
            // colorText: 'rgba(255, 255, 255, 0.823)',
            // colorTextLabel: '#333',
            // colorFillSecondary: 'rgba(255, 148, 148, 0.3)',
          },
          components: {
            Radio: {
              colorPrimary: '#006AFF',
            },
            Checkbox: {
              borderRadius: 4,
            },
            Select: {},
            Segmented: {
              colorBgElevated: '#006AFF',
              colorText: '#ffffff',
            },
          },
        }}
        form={{ validateMessages, requiredMark: false }}
        virtual
      >
        <AntApp>
          <div style={{ direction: isEnlish ? 'ltr' : 'rtl' }}>
            <RoutesWrapper />
            <div style={{ display: 'none' }}>
              <InvoiceCopy />
            </div>
          </div>
          <ScrollToTop />
        </AntApp>
      </ConfigProvider>
    </QueryProvider>
  );
}

export default App;
