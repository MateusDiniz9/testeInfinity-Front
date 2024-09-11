// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/API';

export function useAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('TaskManager');
    if (storedData) {
      try {
        navigate('/tasks');
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('TaskManager');
      }
    }
  }, [navigate]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const loginData = { email, password };

    login(loginData)
      .then((res) => {
        localStorage.setItem('TaskManager', JSON.stringify(res.data));
        navigate('/tasks');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('Login failed! Incorrect email or password, please try again');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      });
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
