import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  onClick,
}) => {
  return (
    <Wrapper>
      <Search
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onClick}>
        <FaSearch />
      </button>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  color: black;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-size: 24px;
  overflow: 1000;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  @media (max-width: 768px) {
    top: 65px;
  }
`;

const Search = styled.input``;
