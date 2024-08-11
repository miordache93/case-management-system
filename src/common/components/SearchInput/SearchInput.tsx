import { ChangeEvent, FunctionComponent, useState } from 'react';
import type { InputBaseProps } from '@mui/material/InputBase/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, Button, TextField } from '@mui/material';

interface SearchInputProps extends InputBaseProps {
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSearch: (value: string) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

const StyledTextField = styled(TextField)(() => `
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
  onSearch,
  value,
  ...props
}) => {
  const [text, setText] = useState(value || '');

  return (
    <StyledTextField
      placeholder={props.placeholder || 'Search…'}
      onChange={(e) => {
        setText(e.target.value);

        if (onChange) {
          onChange?.(e);
        }
      }}
      variant='outlined'
      value={text || ''}
      InputProps={ {
        startAdornment: (
          <SearchIcon />
        ),
        endAdornment:  <Button variant='contained' onClick={() => onSearch(text)}> Search </Button> 
      }}
    />
  );
};

export default SearchInput;
