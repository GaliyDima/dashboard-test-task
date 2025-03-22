import React from "react";
import { Table, Typography, Card, Avatar, Row, Col, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import useAuth from "../../hooks/useAuth";
import useFetchUsers from "../../hooks/useFetchUsers";
import { User } from "../../types";
import "./Dashboard.scss";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { users, loading } = useFetchUsers();

  console.log(user);

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => (a.age || 0) - (b.age || 0),
    },
  ];

  return (
    <div className="dashboard-container">
      <Title level={2}>User Panel</Title>

      {user && (
        <Card className="user-profile-card">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={4} md={3}>
              <Avatar
                size={80}
                src={user.image}
                icon={<UserOutlined />}
                className="user-avatar"
              />
            </Col>
            <Col xs={24} sm={20} md={21}>
              <div className="user-info">
                <Title level={3}>
                  {user.firstName} {user.lastName}
                </Title>
                <Text>Email: {user.email}</Text>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      <div className="users-table-container">
        <Title level={3}>Users List</Title>

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="users-table"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
