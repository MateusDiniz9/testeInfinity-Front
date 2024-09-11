import styled from 'styled-components';

const Bar: React.FC = () => {
  return (
    <div>
      <BottomSidebar></BottomSidebar>
    </div>
  );
};
export const BottomSidebar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default Bar;
