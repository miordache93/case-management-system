import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { useCaseStore } from './store';
import { CaseStatus, PaginatedQuery } from './types';
import { CASES_STATUS_LABEL } from './constants';
import Toolbar from 'src/common/components/Toolbar/Toolbar';

const CasesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const [paginatedQuery, setPaginatedQuery] = useState<PaginatedQuery>({
    search,
    page,
    limit,
    status,
  });

  const { paginatedData, fetchCases } = useCaseStore();

  useEffect(() => {
    fetchCases(paginatedQuery);
  }, [fetchCases, paginatedQuery]);

  useEffect(() => {
    setSearchParams({
      page: paginatedQuery.page?.toString() || '1',
      limit: paginatedQuery.limit?.toString() || '10',
      ...(search && { search:  paginatedQuery.search }) || {},
      ...(paginatedQuery.status && { status: paginatedQuery.status }) || {},
    });
  }, [paginatedQuery]);

  useEffect(() => {
    setPaginatedQuery((prevState) => ({
      ...prevState,
      status,
    }));
  }, [
    status,
  ]);

  const columns = useMemo(() => [
    {
      field: 'priority',
      headerName: 'PRIORITY',
      width: 200,
    },
    {
      field: 'caseName',
      headerName: 'CASE NAME',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'ASSIGNEE',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      width: 200
    }, 
    {
      field: 'status',
      headerName: 'STATUS',
      width: 200
    },
    {
      field: 'type',
      headerName: 'TYPE',
      width: 200
    },
    {
      field: 'dateCreated',
      headerName: 'DATE CREATED',
      width: 200
    },
    {
      field: 'lastUpdated',
      headerName: 'LAST UPDATED',
      width: 200
    },
  ], []);

  return (
    <div>
      <h1> { status ? CASES_STATUS_LABEL[status as CaseStatus ] : 'All Cases' }</h1>
      <Toolbar
        columns={columns}
        searchText=''
        onSearch={ () => {} }
        selectedCases={[]}
        toggleColumnVisibility={ () => {} }
      />
    </div>
  );
};

export default CasesPage;
