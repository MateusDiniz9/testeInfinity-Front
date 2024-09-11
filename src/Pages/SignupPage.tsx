import Top from '../Components/Top';
import { BottomSidebar } from '../Components/Bar';
import styled from 'styled-components';
import PageForm from '../Components/PageForm';
import { useSignup } from '../Hooks/useSignup';

function SignupPage() {
  const { email, setEmail, password, setPassword, sendForm } = useSignup();

  return (
    <Wraper>
      <Top />
      <OutterContainer>
        <MainBox>
          <PageForm
            onSubmit={sendForm}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            buttonLabel="SignUp"
            linkTo="/"
            linkText="I want to LogIn"
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
