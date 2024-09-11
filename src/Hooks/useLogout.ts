import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  function handleLogout(): void {
    localStorage.removeItem('TaskManager');
    navigate('/');
  }

  return {
    handleLogout,
  };
}
