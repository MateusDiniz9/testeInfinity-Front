import React from 'react';
import styled from 'styled-components';

interface NewTask {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'INPROGRESS' | 'DONE';
}

interface AddTaskFormProps {
  onAdd: (newTask: NewTask) => void;
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onClose }) => {
  const [newTask, setNewTask] = React.useState<NewTask>({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'LOW',
  });

  const handleAdd = () => {
    onAdd(newTask);
    onClose();
  };

  return (
    <TaskForm>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
      <button onClick={handleAdd}>Add Task</button>
    </TaskForm>
  );
};

const TaskForm = styled.div`
  position: fixed;
  bottom: 90px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  left: 50%;
  transform: translateX(-50%);

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

export default AddTaskForm;
