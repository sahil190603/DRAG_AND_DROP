import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Typography, message } from "antd";
import AppTextbox from "../components/Generic/AppTextbox";
import "../Style/Register.css";

const { Title } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (values) => {
    const dataToSubmit = { ...values, role: "1" };

    try {
      await axios.post("http://localhost:8000/auth/register/", dataToSubmit);
      message.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      message.error("There was an error registering the user!");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Form onFinish={handleSubmit} layout="vertical">
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Register
          </Title>
          <AppTextbox
            type="text"
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleChange}
          />
          <AppTextbox
            type="text"
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            placeholder="Enter Your First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <AppTextbox
            type="text"
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            placeholder="Enter Your Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <AppTextbox
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            placeholder="Enter Your Email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
          <AppTextbox
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            placeholder="Enter Your Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
