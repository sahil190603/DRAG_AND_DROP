import React, { useEffect, useState, useContext } from "react";
import {
  List,
  Checkbox,
  Button,
  message,
  Popconfirm,
  Row,
  Col,
  Spin,
  Tooltip,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AuthContext } from "../Context/AuthProvider";
import {
  fetchTasks,
  fetchMembers,
  updateTask,
  deleteTask,
} from "../Services/services";
import { avatarData } from "../constant"; // Adjust the path as needed
import AddTask from "./Addtask";
import { useDrop } from "react-dnd";

const TaskList = () => {
  const { user, memberId } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user, memberId]);

  const fetchData = async () => {
    try {
      const userId = user?.user_id;
      const memberData = await fetchMembers(userId);
      setMembers(memberData);

      const taskData =
        memberId === null
          ? await fetchTasks(userId)
          : await fetchTasks(userId, memberId);

      setTasks(taskData);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleCheckboxChange = async (taskId, checked) => {
    try {
      await updateTask(taskId, { is_complete: checked });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, is_complete: checked } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Error updating task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Error deleting task");
    }
  };

  const getAvatarColor = (assignedMemberId) => {
    const member = members.find((member) => member.id === assignedMemberId);
    if (member) {
      const avatar = avatarData.find((avatar) => avatar.id === member.avatar);
      return avatar ? avatar.name : null;
    }
    return null;
  };

  const getMemberName = (assignedMemberId) => {
    const member = members.find((member) => member.id === assignedMemberId);
    return member ? member.first_name : "Unassigned";
  };

  const TaskItem = ({ task }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "MEMBER",
      drop: async (item) => {
        try {
          await updateTask(task.id, { assigned_member: item.id });
          fetchData();
        } catch (error) {
          message.error("Error assigning member");
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <List.Item
        ref={drop}
        style={{
          border: isOver ? "2px dashed #1890ff" : "1px solid #d9d9d9",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "10px",
          marginRight: "7.5%",
          backgroundColor: "whitesmoke",
          cursor: "pointer",
        }}
      >
        <Row gutter={16} align="middle" style={{ width: "100%" }}>
          <Col span={1}>
            <Checkbox
              checked={task.is_complete}
              onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
            />
          </Col>
          <Col span={19}>
            <div
              className="no-select"
              style={{
                textDecoration: task.is_complete ? "line-through" : "none",
                color: task.is_complete ? "grey" : "black",
              }}
            >
              {task.subject}
            </div>
          </Col>
          <Col span={1} style={{ textAlign: "center" }}>
            <Tooltip title={getMemberName(task.assigned_member)}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: getAvatarColor(task.assigned_member),
                  marginRight: "10px",
                }}
              />
            </Tooltip>
          </Col>
          <Col span={1} style={{ textAlign: "right" }}>
            <Popconfirm
              title="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(task.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Col>
        </Row>
      </List.Item>
    );
  };

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div style={{ padding: "50px" }}>
      <AddTask fetchTasks={fetchData} />
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => <TaskItem task={task} />}
      />
    </div>
  );
};

export default TaskList;
