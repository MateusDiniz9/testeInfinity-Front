import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <FiLogOut />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  position: fixed;
  bottom: 8px;
  right: 20px;
  color: white;
  background-color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-size: 24px;
  overflow: 1000;
`;

export default LogoutButton;
