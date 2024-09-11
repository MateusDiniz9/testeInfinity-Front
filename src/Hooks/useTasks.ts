import { useState, useEffect } from 'react';
import {
  getTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from '../Services/API';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const useTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('TaskManager');
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        const userId = userData.user.id;
        getTasks({ userId })
          .then((res) => setTasks(res.data))
          .catch((error) => console.error('Error fetching tasks:', error));
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('TaskManager');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const storedData = localStorage.getItem('TaskManager');
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        const userId = userData.user.id;

        addTask({ ...newTask, userId })
          .then((res) => setTasks([...tasks, res.data]))
          .catch((error) => console.error('Error adding task:', error));
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('TaskManager');
      }
    } else {
      navigate('/');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then(() => setTasks(tasks.filter((task) => task.id !== taskId)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    updateTaskStatus(updatedTask)
      .then(() =>
        setTasks(
          tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        )
      )
      .catch((error) => console.error('Error updating task:', error));
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  };
};
