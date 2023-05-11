import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from 'components/admin/Sidebar/Sidebar';
import OwnHeader from 'components/layout/OwnHeader/OwnHeader';

const { Content } = Layout;

function AdminLayout() {
  return (
    <Layout className="min-h-screen">
      <OwnHeader />
      <Layout>
        <Sidebar />
        <Content className="bg-white max-h-full overflow-y-auto overflow-x-hidden relative">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
