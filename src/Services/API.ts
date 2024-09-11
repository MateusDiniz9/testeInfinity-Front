import axios from 'axios';

const BASE_URL = 'http://localhost:4000/';

interface SignUpBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface Auth {
  token: string;
}

interface TasKsParams {
  userId: number;
}

interface NewTask {
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: number;
}

interface TaskUpdate {
  id: number;
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

const signUp = (body: SignUpBody) => {
  return axios.post(`${BASE_URL}users`, body);
};

function login(body: LoginBody) {
  const promise = axios.post(`${BASE_URL}users/sign-in`, body);
  return promise;
}

function getToken(): string | null {
  const authString = localStorage.getItem('TaskManager');
  if (!authString) {
    return null;
  }
  try {
    const auth: Auth = JSON.parse(authString);
    return auth.token || null;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return null;
  }
}

function getTasks(params: TasKsParams) {
  return axios.get(`${BASE_URL}tasks`, { params });
}

function addTask(newTask: NewTask) {
  return axios.post(`${BASE_URL}tasks`, newTask);
}

function updateTaskStatus(taskUpdate: TaskUpdate) {
  return axios.put(`${BASE_URL}tasks/${taskUpdate.id}`, {
    title: taskUpdate.title,
    description: taskUpdate.description,
    status: taskUpdate.status,
    priority: taskUpdate.priority,
  });
}

function deleteTask(taskId: number) {
  return axios.delete(`${BASE_URL}tasks/${taskId}`);
}

export {
  signUp,
  login,
  getToken,
  getTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
};
