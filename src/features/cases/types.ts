

export enum CaseStatus {
  IN_PROGRESS = 'in progress',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum CasePriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export interface Case {
  caseName: string;
  priority: CasePriority;
  assignee: string;
  description: string;
  status: CaseStatus;
  type: string;
  dateCreated: string;
  lastUpdated: string;
}

export interface PaginatedQuery {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  status?: string;
}

export interface PaginatedData {
  data: Case[];
  limit: number;
  page: number;
  total: number;
}
