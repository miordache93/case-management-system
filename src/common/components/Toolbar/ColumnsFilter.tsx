import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox } from '@mui/material';

interface ColumnsFilterProps {
  columns: any[];
  toggleColumnVisibility: (column: any) => void; 
}

const ColumnsFilter: React.FunctionComponent<ColumnsFilterProps> = ({
  columns,
  toggleColumnVisibility,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="columns-filter-button"
        aria-controls={open ? 'columns-filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        color='primary'
      >
        Columns
      </Button>
      <Menu
        id="columns-filter-menu"
        aria-labelledby="columns-filter-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
          columns.map((column) => (
            <MenuItem
              key={column.headerName}
              onClick={() => toggleColumnVisibility(column)}
            >
              <Checkbox 
                checked={column.visible} 
              />
              {column.headerName}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}

export default ColumnsFilter;
