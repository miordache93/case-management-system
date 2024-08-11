import { SvgIconComponent } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { isUndefined } from "lodash";
import {
  Grid,
  IconButton,
  SvgIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { TableRowActionsProps } from "./types";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledGrid = styled(Grid)(({ theme }) => `
  button {
    color: ${theme.palette.secondary};

    &:hover {
      color: ${theme.palette.primary};
    }
  }
`);

const StyledMoreHorizIcon = styled(MoreHorizIcon)(({ theme }) => `
  &:focus {
    border: 1px solid ${theme.palette.primary.main} !important;
    border-radius: 20px;
  }
`)

export const TableRowActions = <T, >(props: TableRowActionsProps<T>) => {
  const {
    actions,
    item,
    compactMode,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderAction = (action: any) => {
    const { icon, name, onAction } = action;
    const isDisabled = !isUndefined(action.isDisabled) && action.isDisabled(item);
    const onClick = (event: MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
      event.stopPropagation();

      if (!isDisabled) {
        onAction(event, item);
      }

      handleMenuClose();
    };

    return (
      <MenuItem
        key={name}
        disabled={isDisabled}
        onClick={onClick}
      >
        {icon && <SvgIcon component={icon as SvgIconComponent} inheritViewBox />}
        {name}
      </MenuItem>
    );
  };

  return (
    <StyledGrid
      container
      justifyContent="center"
      className="row-actions actions"
    >
      {compactMode ? (
        <>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <StyledMoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {actions.map(renderAction)}
          </Menu>
        </>
      ) : (
        actions.map((action) => {
          const { icon, name, onAction } = action;
          const isDisabled = !isUndefined(action.isDisabled) && action.isDisabled(item);
          const onClick = (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();

            if (!isDisabled) {
              onAction(event, item);
            }
          };

          return (
            <IconButton
              key={name}
              disabled={isDisabled}
              onClick={onClick}
            >
              {icon && <SvgIcon component={icon as SvgIconComponent} inheritViewBox />}
              {name}
            </IconButton>
          );
        })
      )}
    </StyledGrid>
  );
};

export default TableRowActions;
