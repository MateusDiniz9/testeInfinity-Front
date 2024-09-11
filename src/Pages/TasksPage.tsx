import { useEffect, useState } from 'react';
import Bar from '../Components/Bar';
import TopHeader from '../Components/TopHeader';
import { useNavigate } from 'react-router-dom';
import {
  getTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
} from '../Services/API';
import styled from 'styled-components';

function TasksPage() {
  interface Task {
    id: number;
    title: string;
    description: string;
    status: 'DONE' | 'TODO' | 'INPROGRESS';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO' as 'DONE' | 'TODO' | 'INPROGRESS',
    priority: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('TaskManager');
    if (storedData !== null) {
      try {
        const userData = JSON.parse(storedData);
        const userId = userData.user.id;
        getTasks({ userId })
          .then((res) => {
            setTasks(res.data);
          })
          .catch((error) => {
            console.error('Error fetching tasks:', error);
          });
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('TaskManager');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const tasksByStatus = {
    DONE: tasks.filter((task) => task.status === 'DONE'),
    TODO: tasks.filter((task) => task.status === 'TODO'),
    INPROGRESS: tasks.filter((task) => task.status === 'INPROGRESS'),
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    // Implementação para adicionar a nova tarefa
    const storedData = localStorage.getItem('TaskManager');
    if (storedData !== null) {
      try {
        const userData = JSON.parse(storedData);
        const userId = userData.user.id;

        addTask({ ...newTask, userId })
          .then((res) => {
            setTasks([...tasks, res.data]);
            setNewTask({
              title: '',
              description: '',
              status: 'TODO',
              priority: 'LOW',
            });
          })
          .catch((error) => {
            console.error('Error adding task:', error);
          });
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
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEdit = async () => {
    if (selectedTask) {
      try {
        await updateTaskStatus(selectedTask);
        setTasks(
          tasks.map((task) =>
            task.id === selectedTask.id ? selectedTask : task
          )
        );
        closeEditModal();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <div>
      <Bar />
      <Wrapper>
        <h1>My Tasks</h1>
        <Columns>
          <Column>
            <h2>To Do</h2>
            {tasksByStatus.TODO.length > 0 ? (
              <TaskList>
                {tasksByStatus.TODO.map((task) => (
                  <TaskItem key={task.id} priority={task.priority}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {
                      <EditButton onClick={() => openEditModal(task)}>
                        ✏️
                      </EditButton>
                    }
                  </TaskItem>
                ))}
              </TaskList>
            ) : (
              <p>No tasks in this status.</p>
            )}
          </Column>
          <Column>
            <h2>In Progess</h2>
            {tasksByStatus.INPROGRESS.length > 0 ? (
              <TaskList>
                {tasksByStatus.INPROGRESS.map((task) => (
                  <TaskItem key={task.id} priority={task.priority}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {
                      <EditButton onClick={() => openEditModal(task)}>
                        ✏️
                      </EditButton>
                    }
                  </TaskItem>
                ))}
              </TaskList>
            ) : (
              <p>No tasks in this status.</p>
            )}
          </Column>
          <Column>
            <h2>Done</h2>
            {tasksByStatus.DONE.length > 0 ? (
              <TaskList>
                {tasksByStatus.DONE.map((task) => (
                  <TaskItem key={task.id} priority={task.priority}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {
                      <EditButton onClick={() => openEditModal(task)}>
                        ✏️
                      </EditButton>
                    }
                  </TaskItem>
                ))}
              </TaskList>
            ) : (
              <p>No tasks in this status.</p>
            )}
          </Column>
        </Columns>
        {isEditing && selectedTask && (
          <Modal>
            <h2>Edit Task</h2>
            <label>
              Status:
              <select
                value={selectedTask.status}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    status: e.target.value as 'DONE' | 'TODO' | 'INPROGRESS',
                  })
                }>
                <option value="TODO">To Do</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </label>
            <label>
              Priority:
              <select
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
                  })
                }>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </label>
            <div>
              <button onClick={handleEdit}>Save Changes</button>
              <button onClick={closeEditModal}>Cancel</button>
              <button
                onClick={() => {
                  handleDeleteTask(selectedTask.id);
                  closeEditModal();
                }}>
                🗑️
              </button>
            </div>
          </Modal>
        )}
        <AddButton onClick={() => setIsEditing2(!isEditing2)}>+</AddButton>
        {isEditing2 && (
          <TaskForm>
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
                })
              }>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
          </TaskForm>
        )}
      </Wrapper>
      <TopHeader />
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 35px 0px;
  overflow: hidden;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  overflow-x: auto;
  margin: 20px 20px;
  box-sizing: border-box;
`;

const Column = styled.div`
  width: 30%;
  height: 75vh;
  overflow-y: auto;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  & h2 {
    margin-top: 0;
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

interface TaskItemProps {
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

const TaskItem = styled.li<TaskItemProps>`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => getPriorityColor(props.priority)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  & h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
  }

  & p {
    margin: 5px 0;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const getPriorityColor = (priority: 'LOW' | 'MEDIUM' | 'HIGH') => {
  switch (priority) {
    case 'LOW':
      return '#d3ffd3';
    case 'MEDIUM':
      return '#fff6d3';
    case 'HIGH':
      return '#ffd3d3';
    default:
      return '#ffffff';
  }
};

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  & h2 {
    margin-top: 0;
  }

  & label {
    display: block;
    margin-bottom: 10px;
  }

  & input,
  & textarea,
  & select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  & button {
    width: 30%;
    height: 30%;
    margin: 0px 20px;
    margin-top: 20px;
    padding: 15px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: #007bff;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }

  & button:nth-of-type(2) {
    background-color: #ccc;
    &:hover {
      background-color: #999;
    }
  }
  & button:nth-of-type(3) {
    background-color: red;
  }

  div {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskForm = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;

  & input,
  & textarea,
  & select {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  & button {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

export default TasksPage;
