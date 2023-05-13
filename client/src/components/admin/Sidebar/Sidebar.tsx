import React, { useState } from 'react';
import {
  DashboardOutlined,
  DatabaseOutlined,
  GoldOutlined,
  StockOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (item: any) => {
    console.log('onClick  item:', item);
    navigate(item?.key);
    return {};
  };
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', '/dashboard', <DashboardOutlined />),
    getItem('Orders', 'orders', <DatabaseOutlined />),
    getItem('Stock', 'stock', <StockOutlined />),
    getItem('Products', 'products', <GoldOutlined />),
    getItem('Staff', 'staff', <TeamOutlined />),
  ];
  return (
    <Sider
      width={250}
      className="min-h-full"
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

export default Sidebar;
