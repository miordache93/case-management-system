import { Table as MuiTable, TableHead, TableRow, TableCell, TableSortLabel, TableBody, TableFooter, styled, Checkbox } from '@mui/material';
import { Fragment } from 'react';
import { TableProps } from './types';
import { get } from 'lodash';
import TableRowActions from './TableRowActions';
import { CustomTablePagination } from './CustomTablePagination';

const ScrollContainer = styled('div')({
  width: '100%',
  height: 'calc(100vh - 240px)',
  overflow: 'auto',
});

const StickyTableHead = styled(TableHead)(() => ({
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));


const Table= <T extends { caseName: string}, K extends string = string>(props: TableProps<T, K>)  => {
    const {
      columns,
      items,
      selectedItems = [],
      filters,
      rowActions = [],
      compactMode = false,
      count,
      enableSelection = false,
      onPageChange,
      onSelectAll,
      onSelectionChange,
      onSort,
    } = props;

    const isSelected = (caseName: string) => selectedItems.indexOf(caseName) !== -1;

    return (
      <MuiTable
      sx={{ tableLayout: 'fixed' }}
      >
      <ScrollContainer>
        <StickyTableHead>
          <TableRow className='header-row'>
            { (enableSelection && onSelectAll)  && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </TableCell>
            )}
            { columns.filter(column => !column.hidden).map((column) => (
              <TableCell
                align='left'
                key={ column.id }
                style={{
                  width: column.width,
                  minWidth: column.width,
                  overflowY: 'auto',
                }}
                sortDirection={ filters.sort === column.id ? (filters.order || 'desc') : false }
                >
                { (column.sortable && onSort) ? (
                  <TableSortLabel
                    active={ filters.sort === column.id }
                    direction={ filters.sort === column.id ? filters.order : 'asc' }
                    onClick={ () => onSort(
                      column.id,
                      filters.sort === column.id && filters.order === 'asc' ? 'desc' : 'asc'
                    ) }
                  >
                    { column.title?.toUpperCase() }
                  </TableSortLabel>
                ) : (
                  column.title?.toUpperCase()
                ) }
              </TableCell>
            ))}
            <TableCell align='center' sx={ { paddingRight: 3 } } size='small' width='100'>
              ACTION
            </TableCell>
          </TableRow>
        </StickyTableHead>
        <TableBody>
          { items.length ? items?.map((item: T) => (
            <Fragment key={ item.caseName  }>
              <TableRow
                hover
                tabIndex={ -1 }
              >
                  {(enableSelection && onSelectionChange) && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={ isSelected(item.caseName) }
                      onChange={(event) => onSelectionChange(item)}
                    />
                  </TableCell>
                )}
                {
                  columns.filter(column => !column.hidden).map((column, index) => {
                    const cellValue = column.cellRenderer
                    ? column.cellRenderer({ item, index })
                    : get(item, column.dataPath);

                    return (
                      <TableCell
                        key={ `${ item }-${ column.id } ` }
                        align='left'
                        width={ column.width }
                      >
                        { cellValue }
                      </TableCell>
                    )
                  })
                }
                <TableCell
                  className='actions'
                  align='right'
                  size='small'
                  width={ 100 }
                  >
                  <TableRowActions
                    compactMode={ compactMode }
                    key={ `action-${ item.caseName } ` }
                    actions={ rowActions }
                    item={ item }
                  />
                </TableCell>
              </TableRow>
            </Fragment>
          )) :
            <TableRow>
              <TableCell
                size='small'
                colSpan={ 5 }
                sx={ { textAlign: 'center' } }>
                  NO DATA
              </TableCell>
            </TableRow>
          }
        </TableBody>
        </ScrollContainer>
        <TableFooter>
          <TableRow
            style={ {
              height: 66,
            }}
          >
          <CustomTablePagination
            onPageChange={ onPageChange }
            page={ parseInt(filters.page, 10) }
            count={ count }
            rowsPerPage={ parseInt(filters.limit, 10) }
          />
          </TableRow>
        </TableFooter>
      </MuiTable>
  )
};

export default Table;
