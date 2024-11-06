import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card, message, Typography } from "antd";
import AppTextbox from "../components/Generic/AppTextbox";
import "../Style/Login.css";

const { Title } = Typography;

const Login = () => {
  const { setUser, setToken, setIsAuth, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        values
      );
      const { access } = response.data;
      const tokenPayload = JSON.parse(atob(access.split(".")[1]));

      setUser(tokenPayload);
      setToken(access);
      setIsAuth(true);
      setRole(tokenPayload.role);

      localStorage.setItem("authTokens", access);
      localStorage.setItem("userDetails", JSON.stringify(tokenPayload));
      localStorage.setItem("userId", tokenPayload.user_id);

      if (tokenPayload.role === "Manager") {
        message.success("You are logged in as Manager");
      } else {
        message.success("You are logged in as Member");
      }
      navigate("/family-task");
    } catch (error) {
      setErrorMessage("Wrong username or password. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Form onFinish={handleSubmit} layout="vertical">
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Login
          </Title>
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{ marginBottom: "24px" }}
            />
          )}
          <AppTextbox
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            placeholder="Enter Your Username"
            type="text"
          />
          <AppTextbox
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            placeholder="Enter Your Password"
            type="password"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
