import React, { useState, useContext, startTransition } from "react";
import { Form, Button, Typography, message, Row, Col, Space } from "antd";
import AppTextbox from "../components/Generic/AppTextbox";
import "../Style/AddMember.css";
import { AuthContext } from "../Context/AuthProvider";
import { avatarData } from "../constant";
import { addMember, fetchMembers } from "../Services/services";

const { Title } = Typography;

const AddMember = () => {
  const { user } = useContext(AuthContext) ?? {};
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    startTransition(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    });
  };

  const handleAvatarSelect = (value) => {
    startTransition(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: value,
      }));
    });
  };

  const handleSubmit = async (values) => {
    const dataToSubmit = {
      ...values,
      user: user.user_id,
      role: "2",
      avatar: formData.avatar,
    };
    try {
      await addMember(dataToSubmit);
      message.success("User registered successfully");
      fetchMembers()
    } catch (error) {
      message.error("There was an error registering the user!");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register">
      <div className="register-form">
        <Form onFinish={handleSubmit} layout="vertical">
          <Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: "24px",
              fontFamily: "handwritten typefaces",
            }}
          >
            Add Family Member
          </Title>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
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
            </Col>
            <Col xs={24} sm={12}>
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
            </Col>
          </Row>
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
          <div className="avatar-selection">
            <div className="avatar-selection-label">Choose Avatar Color:</div>
            <Space size="small" wrap>
              {avatarData.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-circle ${
                    formData.avatar === avatar.value ? "selected" : ""
                  }`}
                  style={{ backgroundColor: avatar.name.toLowerCase() }}
                  onClick={() => handleAvatarSelect(avatar.value)}
                />
              ))}
            </Space>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddMember;
