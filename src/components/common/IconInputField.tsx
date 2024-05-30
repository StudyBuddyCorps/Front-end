import styled, { css } from "styled-components";
import SearchIcon from "./Icons/SearchIcon";
import { TextField } from "./FieldStyle";

type SearchFieldProps = {
  placeHolder: string;
};

const SearchField = ({ placeHolder }: SearchFieldProps) => {
  return (
    <SearchFiledStyle>
      <SearchIcon width="24px" height="24px" />
      <TextField width="25vw" placeholder={placeHolder}></TextField>
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
