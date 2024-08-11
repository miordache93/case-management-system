import { Table as MuiTable, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from '@mui/material';
import { Fragment } from 'react';
import { TableProps } from './types';
import { get } from 'lodash';
import TableRowActions from './TableRowActions';


  const Table= <T extends { caseName: string}, K extends string = string>(props: TableProps<T, K>)  => {
  
    const {
      columns,
      items,
      filters,
      rowActions = [],
      compactMode = false,
    } = props;

    return (
    <MuiTable>
      <TableHead>
        <TableRow>
          { columns.map((column) => (
            <TableCell
              align='left'
              key={ column.id }
              sortDirection={ filters.sort === column.id ? (filters.order || 'desc') : false }
              >
              { column.sortable ? (
                <TableSortLabel
                  active={ filters.sort === column.id }
                  direction={ filters.sort === column.id ? filters.order : 'asc' }
                  onClick={ () => console.log('onSort(column.id)') }
                >
                  { column.title?.toUpperCase() }
                </TableSortLabel>
              ) : (
                column.title?.toUpperCase()
              ) }
            </TableCell>
          ))}
          <TableCell align='center' sx={ { paddingRight: 3 } }>
            ACTION
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { items.length ? items?.map((item: T) => (
          <Fragment key={ item.caseName  }>
            <TableRow
              hover
              tabIndex={ -1 }
              // onClick={ () => goTo(item) }
            >
              {
                columns.map((column, index) => {
                  const cellValue = column.cellRenderer
                  ? column.cellRenderer({ item, index })
                  : get(item, column.dataPath);

                  return (
                    <TableCell
                      key={ `${ item }-${ column.id } ` }
                      align='left'
                    >
                      { cellValue }
                    </TableCell>
                  )
                })
              }
              <TableCell
                className='actions'
                align='right'
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
              colSpan={ 5 }
              sx={ { textAlign: 'center' } }>
                NO DATA
            </TableCell>
          </TableRow>
        }
      </TableBody>
    </MuiTable>
  )
};

export default Table;
