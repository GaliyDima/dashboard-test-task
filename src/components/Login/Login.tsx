import React from "react";
import { Form, Input, Button, Card, Alert, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.scss";

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    const result = await login(values.username, values.password);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} className="login-title">
          Login
        </Title>

        {error && (
          <Alert
            message={
              typeof error === "object" && error !== null && "message" in error
                ? (error as { message: string }).message
                : error
            }
            type="error"
            showIcon
            className="login-error"
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
              size="large"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="login-help">
          <p>Use test data to login:</p>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
          <p>
            Or choose credits from here{" "}
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://dummyjson.com/users
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
