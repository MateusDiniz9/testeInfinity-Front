import styled from 'styled-components';

const Top: React.FC = () => {
  return (
    <TopBar>
      <Title>Task Manager</Title>
    </TopBar>
  );
};

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
`;

const Title = styled.h1`
  font-size: 40px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export default Top;
