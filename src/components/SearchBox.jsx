import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const SearchContainer = styled.div`
  margin: 0 16px 16px;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  direction: rtl;
`;

const SearchIconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: #a97c50;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-family: "Vazirmatn", Tahoma, Arial, sans-serif;
  font-size: 14px;
  outline: none;
  text-align: right;
  padding: 0;
  color: #666;

  &::placeholder {
    color: #aaa;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
  display: ${({ visible }) => (visible ? "block" : "none")};
  padding: 0;
  margin-right: 8px;

  &:hover {
    color: #666;
  }
`;

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <FiSearch size={18} />
      </SearchIconWrapper>
      <SearchInput
        type="text"
        placeholder="جستجو"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ClearButton visible={searchTerm.length > 0} onClick={clearSearch}>
        ×
      </ClearButton>
    </SearchContainer>
  );
};

export default SearchBox;
