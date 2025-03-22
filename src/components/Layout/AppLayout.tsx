import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./AppLayout.scss";

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="logo">User Dashboard</div>
        {isAuthenticated && (
          <div className="header-right">
            <span className="user-welcome">
              <UserOutlined /> {user?.firstName} {user?.lastName}
            </span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </Button>
          </div>
        )}
      </Header>

      {isAuthenticated && (
        <Menu
          mode="horizontal"
          className="app-menu"
          defaultSelectedKeys={["dashboard"]}
        >
          <Menu.Item
            key="dashboard"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Menu.Item>
        </Menu>
      )}

      <Content className="app-content">
        <Outlet />
      </Content>

      <Footer className="app-footer">
        ©{new Date().getFullYear()} User Dashboard - Test task
      </Footer>
    </Layout>
  );
};

export default AppLayout;
