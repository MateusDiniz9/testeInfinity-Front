import TopBar from '../Components/Top';
import Bar from '../Components/Bar';
import { useState } from 'react';
import { useTasks } from '../Hooks/useTasks';
import EditTaskModal from '../Components/EditTaskModal';
import AddTaskForm from '../Components/AddTaskForm';
import TaskColumn from '../Components/TaskColums';
import styled from 'styled-components';
import LogoutButton from '../Components/LogoutButton';
import { useLogout } from '../Hooks/useLogout';

function TasksPage() {
  const {
    tasks,
    selectedTask,
    setSelectedTask,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  } = useTasks();
  const { handleLogout } = useLogout();
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const tasksByStatus = {
    DONE: tasks.filter((task) => task.status === 'DONE'),
    TODO: tasks.filter((task) => task.status === 'TODO'),
    INPROGRESS: tasks.filter((task) => task.status === 'INPROGRESS'),
  };

  return (
    <>
      <TopBar />
      <Bar />
      <Wrapper>
        <h1>My Tasks</h1>
        <Columns>
          <TaskColumn
            title="To Do"
            tasks={tasksByStatus.TODO}
            onEditTask={(task) => {
              setSelectedTask(task);
              setIsEditing(true);
            }}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasksByStatus.INPROGRESS}
            onEditTask={(task) => {
              setSelectedTask(task);
              setIsEditing(true);
            }}
          />
          <TaskColumn
            title="Done"
            tasks={tasksByStatus.DONE}
            onEditTask={(task) => {
              setSelectedTask(task);
              setIsEditing(true);
            }}
          />
        </Columns>

        {isEditing && selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onClose={() => setIsEditing(false)}
            onSave={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        )}

        <AddButton onClick={() => setIsAdding(!isAdding)}>+</AddButton>
        {isAdding && (
          <AddTaskForm
            onAdd={handleAddTask}
            onClose={() => setIsAdding(false)}
          />
        )}
        <LogoutButton onClick={handleLogout}></LogoutButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 45px 0px;
  overflow: hidden;
  h1 {
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  overflow-x: auto;
  margin: 20px 20px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  background-color: Black;
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
`;

export default TasksPage;
