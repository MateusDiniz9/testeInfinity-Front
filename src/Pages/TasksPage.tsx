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
import { useFilter } from '../Hooks/useFilter';
import SearchBar from '../Components/SearchBar';
import { IoCloseCircle } from 'react-icons/io5';

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
  const [isSearching, setIsSearching] = useState(false);

  const { searchTerm, setSearchTerm, filteredTasks } = useFilter();

  const tasksByStatus = {
    DONE: tasks.filter((task) => task.status === 'DONE'),
    TODO: tasks.filter((task) => task.status === 'TODO'),
    INPROGRESS: tasks.filter((task) => task.status === 'INPROGRESS'),
  };

  return (
    <>
      <TopBar />
      <Bar />
      <SearchBar
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {
          setIsSearching(!isSearching);
        }}
      />
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
      {isSearching && filteredTasks.length > 0 && searchTerm.length > 0 && (
        <ShowTaskSearched>
          {filteredTasks.map((task) => (
            <div key={task.id}>
              <h1>{task.title} </h1>
              <p>{task.description}</p>
              <h2>{task.status}</h2>
              <h3>{task.priority}</h3>
            </div>
          ))}
          <button onClick={() => setIsSearching(!isSearching)}>
            <IoCloseCircle />
          </button>
        </ShowTaskSearched>
      )}
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

const ShowTaskSearched = styled.div`
  height: 75%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  box-sizing: border-box;
  button {
    position: fixed;
    color: black;
    background-color: white;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    font-size: 40px;
    overflow: 1000;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 15px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 1);
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  h1 {
    margin-top: 0px;
    display: flex;
    justify-content: space-between;
    color: black;
    font-size: 25px;
  }
`;

export default TasksPage;
