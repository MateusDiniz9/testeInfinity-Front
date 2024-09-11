import Top from '../Components/Top';
import { BottomSidebar } from '../Components/Bar';
import PageForm from '../Components/PageForm';
import { useAuth } from '../Hooks/useAuth';
import styled from 'styled-components';

function SignupPage() {
  const { email, setEmail, password, setPassword, handleLogin } = useAuth();

  return (
    <Wraper>
      <Top />
      <OutterContainer>
        <MainBox>
          <PageForm
            onSubmit={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            buttonLabel="Login"
            linkTo="/signup"
            linkText="I want to register"
          />
        </MainBox>
      </OutterContainer>
      <BottomSidebar />
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
