import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {  Button, Chip, Grid, Typography, useTheme } from '@mui/material';

import { useCaseStore } from './store';
import { Case, CasePriority, CaseStatus, PaginatedQuery } from './types';
import { CASES_STATUS_LABEL } from './constants';
import Toolbar from 'src/common/components/Toolbar/Toolbar';
import Table from 'src/common/components/Table/Table';
import { Column, ItemRendererArgs, TableRowAction } from 'src/common/components/Table/types';
import Badge from 'src/common/components/Badge/Badge';

const CasesPage: React.FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const { paginatedData, fetchCases } = useCaseStore();

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
      width: 200,
    },
    {
      id: 'assignee',
      dataPath: 'assignee',
      title: 'Assignee',
      width: 200,
    },
    {
      id: 'description',
      dataPath: 'description',
      title: 'Description',
      width: 200
    }, 
    // @ts-ignore
    {
      id: 'status',
      dataPath: 'status',
      title: 'Status',
      width: 200,
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
      width: 200,
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
      title: 'Date Created',
      width: 200
    },
    {
      id: 'lastUpdated',
      dataPath: 'lastUpdated',
      title: 'Last Updated',
      width: 200
    },
  ], []);

  const actions: ReadonlyArray<TableRowAction<Case>> = [
    {
        name: 'Accept case',
        onAction: (e, item) => {
            // accept case
        },
    },
    {
        name: 'Reject case',
        onAction: (e, item) => {
           // reject case
        }
    },
];

  return (
    <Grid container flexDirection='column' mt={2} rowGap={2}>
      <Grid item mb={1}>
        <Typography variant='h1' fontSize={24}>
          { status ? CASES_STATUS_LABEL[status as CaseStatus ] : 'All Cases' }
        </Typography>
      </Grid>
      <Grid item width='100%'>
        <Toolbar
          columns={columns}
          searchText=''
          onSearch={ () => {} }
          selectedCases={[]}
          toggleColumnVisibility={ () => {} }
        />
      </Grid>
      <Grid item width='100%'>
        <Table
          items={paginatedData.data}
          columns={columns}
          filters={paginatedQuery}
          rowActions={actions}
          compactMode
        />
      </Grid>
    </Grid>
  );
};

export default CasesPage;
