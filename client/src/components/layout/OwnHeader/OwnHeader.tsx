import { Button, Col, Dropdown, Layout, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  LogoutOutlined,
  PrinterOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'services/store/configureStore';
import { generalDataUpdate } from 'services/store/reducers/generalData';
import { useState } from 'react';
import OwnModal from 'components/modals/OwnModal';
import useAuth from 'api-hooks/auth/useAuth';
import constants from 'consts';

const { Header } = Layout;

function OwnHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(s => s.user.data);
  const lastOrder = useAppSelector(s => s.generalData.lastOrder);
  const { signOut, authLoading } = useAuth();
  const [isLogoutMod, setIsLogoutMod] = useState<boolean>(false);

  const closeLogoutMod = () => setIsLogoutMod(false);
  const onLogout = () => {
    signOut(closeLogoutMod);
  };
  return (
    <>
      <Header className="h-16 bg-white border-b ">
        <Row gutter={20} align="middle" justify="space-between">
          <Col>
            {userData && (
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: '/dashboard',
                      label: 'Dashboard',
                      icon: <DashboardOutlined />,
                      onClick: ({ key }) => navigate(key),
                      disabled: userData?.role !== 'admin',
                    },
                    {
                      key: '/update-password',
                      label: 'Update Password',
                      icon: <SafetyCertificateOutlined />,
                      onClick: ({ key }) => navigate(key),
                    },
                    {
                      key: 'Logout',
                      label: 'Logout',
                      icon: <LogoutOutlined />,
                      onClick: () => setIsLogoutMod(true),
                    },
                  ],
                }}
                arrow
              >
                <Button
                  type="primary"
                  ghost
                  icon={<UserOutlined />}
                  className="flex items-center capitalize"
                >
                  {userData.name?.split(' ')[0]}
                </Button>
              </Dropdown>
            )}
          </Col>
          <Col>
            <Link to="/">
              <img src={constants.logo} alt="Brand" className="h-14" />
            </Link>
          </Col>
          <Col>
            {!!lastOrder && (
              <Button
                type="primary"
                ghost
                className="flex items-center capitalize"
                icon={<PrinterOutlined />}
                onClick={() =>
                  dispatch(generalDataUpdate({ isOrderToCopy: true }))
                }
              >
                Last order
              </Button>
            )}
            {/* <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <Space direction="vertical" style={{ width: 220 }}>
                  {userData?.role === 'admin' && (
                    <Link to="/dashboard">dashboard</Link>
                  )}
                  {userData?.role !== 'user' && (
                    <Link to="/orders">orders</Link>
                  )}
                  {!!lastOrder && (
                    <Button
                      type="link"
                      style={{ padding: 0 }}
                      onClick={() =>
                        dispatch(generalDataUpdate({ isOrderToCopy: true }))
                      }
                    >
                      Print last order
                    </Button>
                  )}
                </Space>
              }
            >
              <Button
                type="link"
                icon={<BarsOutlined style={{ fontSize: 24 }} />}
              />
            </Popover> */}
          </Col>
        </Row>
      </Header>
      <OwnModal open={isLogoutMod} onCancel={closeLogoutMod} title="Logout">
        <div className="flex flex-col gap-8 items-center">
          <img
            src={constants.logoutLogo}
            alt="coffe Spilled"
            className="w-1/2"
          />
          <div className="space-y-6">
            <h2 className="text-xl font-medium">
              Are you sure you want to logout?
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Button type="primary" loading={authLoading} onClick={onLogout}>
                Logout
              </Button>
              <Button type="primary" ghost onClick={closeLogoutMod}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </OwnModal>
    </>
  );
}

export default OwnHeader;
