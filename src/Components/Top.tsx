import styled from 'styled-components';

function Top() {
  return (
    <TopBar>
      <Title>Task Manager</Title>
    </TopBar>
  );
}

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #007bff;
  color: white;
  input::placeholder {
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 50px;

  @media (max-width: 768px) {
    margin-left: 0px;
    margin-bottom: 10px;
    font-size: 30px;
  }
`;

export default Top;
