import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface BatchActionsProps {
  enableBatchActions: boolean;
  onAcceptCases: () => void;
  onRejectCases: () => void;
}

const BatchActions: React.FunctionComponent<BatchActionsProps> = ({
  enableBatchActions,
  onAcceptCases,
  onRejectCases,
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
        id="batch-actions-button"
        aria-controls={open ? 'batch-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        color='primary'
        disabled={!enableBatchActions}
        endIcon={<ArrowDropDownIcon />}
      >
        Batch action
      </Button>
      <Menu
        id="batch-actions-menu"
        aria-labelledby="batch-actions-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          onAcceptCases();
          handleClose();
        }}>Accept cases</MenuItem>
        <MenuItem onClick={() => {
          onRejectCases();
          handleClose();
        }}>Reject cases</MenuItem>
      </Menu>
    </div>
  );
}

export default BatchActions;
