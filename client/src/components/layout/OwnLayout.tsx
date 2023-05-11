import { Outlet } from 'react-router-dom';
import OwnHeader from './OwnHeader/OwnHeader';
import { Layout } from 'antd';
import Cart from 'components/Cart/Cart';

const { Content } = Layout;

function OwnLayout() {
  return (
    <Layout className="max-h-screen">
      <Layout>
        <OwnHeader />
        <Content className="bg-white max-h-full overflow-y-auto overflow-x-hidden relative">
          <Outlet />
        </Content>
        {/* <OwnFooter /> */}
      </Layout>
      <Cart />
    </Layout>
  );
}

export default OwnLayout;
