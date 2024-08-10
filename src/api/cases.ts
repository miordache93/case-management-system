import axios from 'axios';
import { Case, PaginatedData, PaginatedQuery } from '../features/case/types';

// Fetch all cases
export const fetchCasesApi = async (query: PaginatedQuery): Promise<PaginatedData> => {
  const response = await axios.get<PaginatedData>(`/requests`, { params: query });
  return response.data;
};

// Update case status
export const updateCaseStatusApi = async (caseName: string, status: string): Promise<Case> => {
  const response = await axios.put<Case>('/update-status', { caseName, status });
  return response.data;
};
