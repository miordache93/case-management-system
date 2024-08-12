import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CaseStatus, PaginatedData, PaginatedQuery } from './types';
import { fetchCasesApi, updateCaseStatusApi } from '../../api/cases';

interface CaseState {
  paginatedData: PaginatedData;
  loading: boolean;
  visibleColumnIds: string[];
  error: string | null;
  fetchCases: (query: PaginatedQuery) => void;
  updateCaseStatus: (cases: string[], status: CaseStatus) => void;
  toggleColumnVisibility: (columnId: string) => void;
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
  visibleColumnIds: [
    'priority',
    'caseName',
    'assignee',
    'description',
    'status',
    'type',
    'dateCreated',
    'lastUpdated',
  ],
  fetchCases: () => {},
  updateCaseStatus: () => {},
  toggleColumnVisibility: () => {},
};

export const useCaseStore = create<CaseState>()(
  persist(
    (set) => ({
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

      updateCaseStatus: async (cases, status) => {
        set({ loading: true });
        try {
          await updateCaseStatusApi(cases, status);

          set((state) => {
            const updatedData = state.paginatedData.data.map((item) => {
              if (cases.includes(item.caseName)) {
                return { ...item, status };
              }
              return item;
            });

            return {
              paginatedData: {
                ...state.paginatedData,
                data: updatedData,
              },
              loading: false,
            };
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      toggleColumnVisibility: (columnId: string) => {
        set((state) => {
          const newVisibleColumnIds = state.visibleColumnIds.includes(columnId)
            ? state.visibleColumnIds.filter((id) => id !== columnId)
            : [...state.visibleColumnIds, columnId];

          return { visibleColumnIds: newVisibleColumnIds };
        });
      },
    }),
    {
      name: 'case-settings',
      partialize: (state) => ({
        visibleColumnIds: state.visibleColumnIds,
      }),
    }
  )
);
