import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, useTheme } from '@mui/material';

import { useCaseStore } from './store';
import { Case, CasePriority, CaseStatus, PaginatedQuery } from './types';
import { CASES_STATUS_LABEL } from './constants';
import Toolbar from 'src/common/components/Toolbar/Toolbar';
import Table from 'src/common/components/Table/Table';
import { Column, TableRowAction } from 'src/common/components/Table/types';
import Badge from 'src/common/components/Badge/Badge';

const CasesPage: React.FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(() => {
    const savedColumns = localStorage.getItem('visibleColumnIds');
    return savedColumns ? JSON.parse(savedColumns) : [
      'priority',
      'caseName',
      'assignee',
      'description',
      'status',
      'type',
      'dateCreated',
      'lastUpdated'
    ];
  });
  const {paginatedData, fetchCases, updateCaseStatus } = useCaseStore();

  const paginatedQuery: PaginatedQuery = useMemo<PaginatedQuery>(() => ({
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: parseInt(searchParams.get('limit') || '10', 10),
    status: searchParams.get('status') || '',
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') as PaginatedQuery['order'] || 'desc',
  }), [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: paginatedQuery.page?.toString() || '1',
      limit: paginatedQuery.limit?.toString() || '10',
      sort: paginatedQuery.sort || '',
      order: paginatedQuery.order || 'desc',
      ...(paginatedQuery.search && { search:  paginatedQuery.search }) || {},
      ...(paginatedQuery.status && { status: paginatedQuery.status }) || {},
    });

    fetchCases(paginatedQuery);
  }, [paginatedQuery]);

  const columns = useMemo<Column<Case>[]>(() => [
      // @ts-ignore
    {
      id: 'priority',
      dataPath: 'priority',
      title: 'Priority',
      sortable: true,
      hidden: !visibleColumnIds.includes('priority'),
      width: 200,
      // @ts-ignore
      cellRenderer: ({ item }) => (
        <Badge
          text={ item.priority.toUpperCase() }
          color={ theme.palette.common.white }
          backgroundColor={ item.priority === CasePriority.HIGH ? theme.palette.error.main : theme.palette.primary.main }
        />
      )
    },
    {
      id: 'caseName',
      dataPath: 'caseName',
      title: 'Case Name',
      sortable: true,
      hidden: !visibleColumnIds.includes('caseName'),
      width: 200,
    },
    {
      id: 'assignee',
      dataPath: 'assignee',
      title: 'Assignee',
      hidden: !visibleColumnIds.includes('assignee'),
      sortable: true,
      width: 200,
    },
    {
      id: 'description',
      dataPath: 'description',
      title: 'Description',
      sortable: true,
      hidden: !visibleColumnIds.includes('description'),
      width: 800
    }, 
    // @ts-ignore
    {
      id: 'status',
      dataPath: 'status',
      title: 'Status',
      sortable: true,
      width: 200,
      hidden: !visibleColumnIds.includes('status'),
      // @ts-ignore
      cellRenderer: ({ item }) => (
        <Badge
          text={ item.status.toUpperCase() }
          color={ theme.palette.common.white }
          backgroundColor='#4D4C76'
        />
      )
      
    },
    // @ts-ignore
    {
      id: 'type',
      dataPath: 'type',
      title: 'Type',
      sortable: true,
      width: 200,
      hidden: !visibleColumnIds.includes('type'),
      // @ts-ignore
      cellRenderer: ({ item }) => (
        <Badge
          text={ item.type.toUpperCase() }
          color='#606F89'
          backgroundColor={ theme.palette.common.white}
          border='1px solid #606F89'
        />
      )
    },
    {
      id: 'dateCreated',
      dataPath: 'dateCreated',
      sortable: true,
      title: 'Date Created',
      hidden: !visibleColumnIds.includes('dateCreated'),
      width: 200
    },
    {
      id: 'lastUpdated',
      dataPath: 'lastUpdated',
      title: 'Last Updated',
      hidden: !visibleColumnIds.includes('lastUpdated'),
      sortable: true,
      width: 200
    },
  ], [visibleColumnIds]);

  const actions: ReadonlyArray<TableRowAction<Case>> = [
    {
        name: 'Accept case',
        onAction: (e, item) => {
          updateCaseStatus([item.caseName], CaseStatus.ACCEPTED);
        },
    },
    {
        name: 'Reject case',
        onAction: (e, item) => {
          updateCaseStatus([item.caseName], CaseStatus.REJECTED);
        }
    },
  ];

  const handleSort = (columnId: string, order: 'desc' | 'asc') => {
    searchParams.set('sort', columnId);
    searchParams.set('order', order);
    setSearchParams(searchParams);
  };

  const toggleColumnVisibility = (column: Column<Case>) => {
    const newVisibleColumnIds = visibleColumnIds.includes(column.id)
      ? visibleColumnIds.filter((id) => id !== column.id)
      : [...visibleColumnIds, column.id];

    setVisibleColumnIds(newVisibleColumnIds);

    // Persist the column visibility state to localStorage
    localStorage.setItem('visibleColumnIds', JSON.stringify(newVisibleColumnIds));
  };

  return (
    <Grid container flexDirection='column' mt={2} rowGap={2} >
      <Grid item mb={1}>
        <Typography variant='h1' fontSize={24}>
          { status ? CASES_STATUS_LABEL[status as CaseStatus ] : 'All Cases' }
        </Typography>
      </Grid>
      <Grid item width='100%'>
        <Toolbar
          columns={columns}
          searchText={paginatedQuery.search || ''}
          onSearch={ (searchText) => {
            searchParams.set('search', searchText);
            setSearchParams(searchParams);
          } }
          enableBatchActions={selectedItemIds.length > 1 }
          onAcceptCases={ () => updateCaseStatus(selectedItemIds, CaseStatus.ACCEPTED) }
          onRejectCases={ () => updateCaseStatus(selectedItemIds, CaseStatus.REJECTED) }
          toggleColumnVisibility={ toggleColumnVisibility }
        />
      </Grid>
      <Grid item width='calc(100vw - 260px)'>
        <Table
          enableSelection
          items={paginatedData.data}
          selectedItems={ selectedItemIds }
          columns={columns}
          filters={paginatedQuery}
          rowActions={actions}
          compactMode
          count={ paginatedData.total}
          onSort={ handleSort }
          onPageChange={ (pageNumber) => {
            searchParams.set('page', pageNumber.toString());
            setSearchParams(searchParams);
          }}
          onSelectAll={ (selection) => {
            if (selection) {
              setSelectedItemIds(paginatedData.data.map((item) => item.caseName));
            } else {
              setSelectedItemIds([]);
          } }}
          onSelectionChange={ (item: Case) => {
            if (selectedItemIds.includes(item.caseName)) {
              setSelectedItemIds(selectedItemIds.filter((id) => id !== item.caseName));
            } else {
              setSelectedItemIds([...selectedItemIds, item.caseName]);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CasesPage;
