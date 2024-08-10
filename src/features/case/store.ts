
import { create } from 'zustand';
import { Case, CaseStatus, PaginatedData, PaginatedQuery } from './types';
import { fetchCasesApi, updateCaseStatusApi } from '../../api/cases';

interface CaseState {
  paginatedData: PaginatedData;
  loading: boolean;
  error: string | null;
  fetchCases: (query: PaginatedQuery) => void;
  updateCaseStatus: (caseName: string, status: CaseStatus) => void;
}

const initialState: CaseState = {
  paginatedData: {
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  },
  loading: false,
  error: null,
  fetchCases: () => {},
  updateCaseStatus: () => {},
}

export const useCaseStore = create<CaseState>((set) => ({
  ...initialState,
  fetchCases: async (query) => {
    set({ loading: true });
    try {
      const paginatedData = await fetchCasesApi(query);
      set({ paginatedData, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updateCaseStatus: async (caseName, status) => {
    set({ loading: true });
    try {
      await updateCaseStatusApi(caseName, status);

      set((state) => ({
        cases: state.paginatedData.data.map((caseItem: Case) =>
          caseItem.caseName === caseName ? { ...caseItem, status } : caseItem
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
