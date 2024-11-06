import axios from "axios";

const API_BASE_URL = "http://localhost:8000/auth";
const API_TASK_URL = "http://127.0.0.1:8000/Task";

export const addMember = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addMember/`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error during registration: " + error.message);
  }
};

export const addTask = async (data) => {
  try {
    const response = await axios.post(`${API_TASK_URL}/tasks/`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error adding task: " + error.message);
  }
};

export const fetchAllTask = async (userId) => {
  const response = await axios.get(`${API_TASK_URL}/tasks/`);
  return response.data;
};

export const fetchMembers = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/addMember/user/${userId}/`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching members: " + error.message);
  }
};

export const fetchTasks = async (userId, memberId) => {
  try {
    let response;
    if (memberId !== "null" && memberId !== undefined) {
      response = await axios.get(
        `${API_TASK_URL}/tasks/user/${userId}/assigned_member/${memberId}/`
      );
    } else if (userId) {
      response = await axios.get(`${API_TASK_URL}/tasks/user/${userId}/`);
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks: " + error.message);
  }
};

export const updateTask = async (taskId, data) => {
  try {
    const response = await axios.patch(
      `${API_TASK_URL}/tasks/${taskId}/`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating task: " + error.message);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_TASK_URL}/tasks/${taskId}/`);
  } catch (error) {
    throw new Error("Error deleting task: " + error.message);
  }
};

export const fetchTasksByUserAndMember = async (userId, memberId) => {
  const response = await axios.get(
    `${API_TASK_URL}/tasks/user/${userId}/assigned_member/${memberId}/`
  );
  return response.data;
};
