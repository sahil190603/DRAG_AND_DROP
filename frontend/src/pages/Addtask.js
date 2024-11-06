import React, { useContext } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { AuthContext } from "../Context/AuthProvider";
import { addTask } from "../Services/services";

const AddTask = ({ fetchTasks }) => {
  const { user, memberId } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    // Create the data to submit
    const dataToSubmit = {
      ...values,
      user: user.user_id,
      // Include memberId if it's not null
      ...(memberId !== null && { assigned_member: memberId }),
    };

    try {
      await addTask(dataToSubmit);
      message.success("Task added successfully");
      fetchTasks(); // Refresh the task list
      form.resetFields(); // Clear the form fields
    } catch (error) {
      message.error("Error adding task");
      console.error("Error adding task:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="subject"
            label="Add Task"
            rules={[{ required: true, message: "Please enter a new task!" }]}
          >
            <Input placeholder="Enter new task" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "70%", marginTop: "28px" }}
            >
              Add Task
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTask;
