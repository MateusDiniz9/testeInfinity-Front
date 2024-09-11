import Top from '../Components/Top';
import { BottomSidebar } from '../Components/Bar';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { login } from '../Services/API';

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('TaskManager');
    if (storedData !== null) {
      try {
        const userData = JSON.parse(storedData);
        setUser(userData);
        navigate('/tasks');
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('TaskManager');
      }
    }
  }, [navigate]);

  function sendForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const loginData = { email, password };
    login(loginData)
      .then((res) => {
        setUser(res.data);
        const jsonData = JSON.stringify(res.data);
        localStorage.setItem('TaskManager', jsonData);
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

  return (
    <Wraper>
      <Top></Top>
      <OutterContainer>
        <MainBox>
          <PageForm onSubmit={sendForm}>
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}></input>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}></input>
            <FormButton>Login</FormButton>
            <Link to={`/signup`}>
              <p>I want to register</p>
            </Link>
          </PageForm>
        </MainBox>
      </OutterContainer>
      <BottomSidebar></BottomSidebar>
    </Wraper>
  );
}

export default SignupPage;

const Wraper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const OutterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MainBox = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 614px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const PageForm = styled.form`
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
    background-color: #007bff;
    outline: none;
    border: 1px solid #007bff;
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 400;
    color: white;
    padding-left: 10px;
    cursor: default;
  }
  input::placeholder {
    color: white;
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
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
