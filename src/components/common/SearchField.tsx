import styled from "styled-components";
import SearchIcon from "./Icons/SearchIcon";
import { TextField } from "./FieldStyle";
import { useState } from "react";

type SearchFieldProps = {
  placeHolder: string;
  width?: string;
  onSearch?: (value: string) => void;
};

const SearchField = ({ placeHolder, width, onSearch }: SearchFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <SearchFiledStyle>
      <SearchIcon width="24px" height="24px" />
      <TextField 
        width={width} 
        placeholder={placeHolder} 
        onChange={handleInputChange}
      ></TextField>
    </SearchFiledStyle>
  );
};

const SearchFiledStyle = styled.div`
  display: flex;
  height: 50px;
  padding: 0px 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white01};
  border-radius: 5px;
  border: none;
`;

export default SearchField;
