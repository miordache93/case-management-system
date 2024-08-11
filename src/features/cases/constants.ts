import { CaseStatus } from "./types";

export const CASES_STATUS_LABEL: Record<CaseStatus, string> = {
  [CaseStatus.ACCEPTED]: 'Accepted Cases',
  [CaseStatus.REJECTED]: 'Rejected Cases',
  [CaseStatus.IN_PROGRESS]: 'Pending Cases',
}