import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../Services/API';

export function useSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function sendForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const signUpData = { email, password };

    signUp(signUpData)
      .then(() => navigate('/'))
      .catch((err) => {
        if (err.response.status === 409) {
          alert('Oops.. Email already exists! 😅');
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
    sendForm,
  };
}
