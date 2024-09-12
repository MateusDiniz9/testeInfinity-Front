import { useState } from 'react';
import { useTasks } from './useTasks';

export function useFilter() {
  const { tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    filteredTasks,
    searchTerm,
    setSearchTerm,
  };
}
