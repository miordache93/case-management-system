import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { useCaseStore } from './store';
import { PaginatedQuery } from './types';

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

  return (
    <div>
      <Button
      size="small"
        variant='contained'>
        Columns
      </Button>
      <Button
        variant='contained'
        disabled
        size="small"
      >
        Batch actions
      </Button>
      {
        JSON.stringify(paginatedData)
      }
    </div>
  );
};

export default CasesPage;
