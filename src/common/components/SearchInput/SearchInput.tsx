import { ChangeEvent, FunctionComponent } from 'react';
import type { InputBaseProps } from '@mui/material/InputBase/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, styled, alpha, Button, Box, TextField } from '@mui/material';

interface SearchInputProps extends InputBaseProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => `
  font-family: 'Inter';

  .MuiInputBase-root {
    padding-right: 0;
  }

  input {
    padding: 6px 12px;
    border-radius: 6px;
  }

  button {
    min-width: 73px;
  }
`);

const SearchInput: FunctionComponent<SearchInputProps> = ({
  onChange,
  value,
  ...props
}) => {
  return (
    <StyledTextField
      placeholder={props.placeholder || 'Search…'}
      onChange={onChange}
      variant='outlined'
      value={value}
      InputProps={ {
        startAdornment: (
          <SearchIcon />
        ),
        endAdornment:  <Button variant='contained'> Search </Button> 
      }}
    />
  );
};

export default SearchInput;
