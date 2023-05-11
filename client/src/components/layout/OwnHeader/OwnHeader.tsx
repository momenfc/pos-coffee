import { Button, Col, Dropdown, Layout, Popover, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import coffeSpilled from 'assets/images/coffee beans and spilled coffee.png';
import { BarsOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'services/store/configureStore';
import { generalDataUpdate } from 'services/store/reducers/generalData';
import { useState } from 'react';
import OwnModal from 'components/modals/OwnModal';
import useAuth from 'api-hooks/auth/useAuth';

const { Header } = Layout;

function OwnHeader() {
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
                menu={{
                  items: [
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
              <img src={logo} alt="Brand" className="h-14" />
            </Link>
          </Col>
          <Col>
            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <Space direction="vertical" style={{ width: 220 }}>
                  <Link to="/dashboard">dashboard</Link>
                  <Link to="/orders">orders</Link>
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
            </Popover>
          </Col>
        </Row>
      </Header>
      <OwnModal open={isLogoutMod} onCancel={closeLogoutMod} title="Logout">
        <div className="flex flex-col gap-8 items-center">
          <img src={coffeSpilled} alt="coffe Spilled" className="w-1/2" />
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
