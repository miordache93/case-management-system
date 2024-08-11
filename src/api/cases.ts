import axios from 'axios';
import { Case, PaginatedData, PaginatedQuery } from '../features/cases/types';

// Fetch all cases
export const fetchCasesApi = async (query: PaginatedQuery): Promise<PaginatedData> => {
  const response = await axios.get<PaginatedData>(`/requests`, { params: query });
  return response.data;
};

// Update case status
export const updateCaseStatusApi = async (ids: string[], status: string): Promise<Case> => {
  const response = await axios.put<Case>('/update-status', { ids, status });
  return response.data;
};
