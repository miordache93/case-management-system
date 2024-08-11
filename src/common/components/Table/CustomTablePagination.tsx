import type { FunctionComponent } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

const StyledBox = styled(Box)(() => `
  width: calc(100vw - 260px);
`);

const StyledButton = styled(Button)(() => `
  padding: 2px 4px;
  width: 40px;
  height: 40px;
`);

export interface TablePaginationActionsProps {
  count: number,
  page: number,
  rowsPerPage: number,
  onPageChange: (newPage: number) => void,
}

export const CustomTablePagination: FunctionComponent<TablePaginationActionsProps> = (
  {
    onPageChange,
    count,
    page,
    rowsPerPage
  }) => {
  const nrOfPages = Math.ceil(count / rowsPerPage);

  return (
    <StyledBox width='calc(100vw-260px)' display='flex' flexDirection='row' justifyContent='space-between' mt={2} alignItems='center'>
        <Box justifyContent='flex-start'>
          <Typography variant='body2' sx={{ textWrap: 'no-wrap'}}>
              {
                `${page} - ${nrOfPages} of ${count} cases`
              }
            </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' minWidth={120} columnGap={ 1} textAlign='center' alignItems='center'>
          <StyledButton variant='outlined' color='secondary' size='small' disabled={ page === 1}  onClick={() => onPageChange(page - 1)}>
              { page > 1 ? <KeyboardArrowLeft/> : <Typography variant='body2'>1</Typography>}
            </StyledButton>
            <Typography variant='body2'>
              {`/ ${nrOfPages}`}
            </Typography>
            <StyledButton disabled={ page === nrOfPages } variant='outlined' color='secondary' size='small' onClick={() => onPageChange(page +1)}>
              { page < nrOfPages ? <KeyboardArrowRight/> : page}
            </StyledButton>
        </Box>
    </StyledBox>
  );
}

export default CustomTablePagination;
