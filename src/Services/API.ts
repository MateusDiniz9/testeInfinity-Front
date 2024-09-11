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

interface getTasks {
  userId: number;
}

interface NewTask {
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: number; // Adicione o ID do usuário à nova tarefa
}

interface TaskUpdate {
  id: number;
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

function getTasks(params: getTasks) {
  return axios.get(`${BASE_URL}tasks`, { params });
}

function addTask(newTask: NewTask) {
  return axios.post(`${BASE_URL}tasks`, newTask);
}

function updateTaskStatus(taskUpdate: TaskUpdate) {
  return axios.put(`${BASE_URL}tasks/${taskUpdate.id}`, {
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
