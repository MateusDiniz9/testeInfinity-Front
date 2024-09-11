import React from 'react';
import styled from 'styled-components';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  onDelete: (taskId: number) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
  onDelete,
}) => {
  const [editedTask, setEditedTask] = React.useState<Task>(task);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal>
      <h2>Edit Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              title: e.target.value,
            })
          }
        />
      </label>
      <label>
        Description:
        <textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              description: e.target.value,
            })
          }
        />
      </label>
      <label>
        Status:
        <select
          value={editedTask.status}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
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
          value={editedTask.priority}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
            })
          }>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
      <div>
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={() => {
            onDelete(task.id);
            onClose();
          }}>
          🗑️
        </button>
      </div>
    </Modal>
  );
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

export default EditTaskModal;
