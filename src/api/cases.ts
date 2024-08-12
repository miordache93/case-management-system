import axios from 'axios';
import { Case, PaginatedData, PaginatedQuery } from '../features/cases/types';

export const fetchCasesApi = async (query: PaginatedQuery): Promise<PaginatedData> => {
  const response = await axios.get<PaginatedData>(`/requests`, { params: query });
  return response.data;
};

export const updateCaseStatusApi = async (ids: string[], status: string): Promise<Case> => {
  const response = await axios.put<Case>('/update-status', { ids, status });
  return response.data;
};
