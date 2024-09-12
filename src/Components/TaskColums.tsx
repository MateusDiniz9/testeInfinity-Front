import React from 'react';
import styled from 'styled-components';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'DONE' | 'TODO' | 'INPROGRESS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onEditTask,
}) => {
  return (
    <Column>
      <h2>{title}</h2>
      {tasks.length > 0 ? (
        <TaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id} priority={task.priority}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <EditButton onClick={() => onEditTask(task)}>✏️</EditButton>
            </TaskItem>
          ))}
        </TaskList>
      ) : (
        <p>No tasks in this status.</p>
      )}
    </Column>
  );
};

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
    font-size: 25px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
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

export const getPriorityColor = (priority: 'LOW' | 'MEDIUM' | 'HIGH') => {
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

export default TaskColumn;
