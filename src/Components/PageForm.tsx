import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PageFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  buttonLabel: string;
  linkTo: string;
  linkText: string;
}

const PageForm: React.FC<PageFormProps> = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  buttonLabel,
  linkTo,
  linkText,
}) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton type="submit">{buttonLabel}</FormButton>
      <Link to={linkTo}>
        <p>{linkText}</p>
      </Link>
    </FormContainer>
  );
};

export default PageForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 80%;
  max-height: 100%;
  overflow-y: hidden;
  word-wrap: wrap;
  word-break: break-word;
  gap: 13px;
  cursor: default;

  @media (max-width: 614px) {
    padding: 40px 0 91px 0;
  }

  input {
    max-width: 429px;
    width: 90%;
    height: 65px;
    border-radius: 6px;
    background-color: white;
    outline: none;
    border: 1px solid #007bff;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 400;
    color: black;
    padding-left: 10px;
    cursor: default;
  }
  input::placeholder {
    color: black;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
  }
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 181px;
    height: 24px;
    font-size: 20px;
    font-weight: 400;
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
  }
`;

const FormButton = styled.button`
  max-width: 429px;
  width: 90%;
  height: 65px;
  border: none;
  outline: 1px solid #007bff;
  border-radius: 6px;
  background-color: #007bff;
  font-size: 27px;
  font-weight: 700;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
