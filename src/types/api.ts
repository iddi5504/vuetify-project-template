

export interface API_LIST_RESPONSE<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  content: T[];
}

export enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}





export interface API_LIST_QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  title?: string;
  sortOrder?: SORT_ORDER;
  search?: string;
  name?: string;
  entityId?: string;
  offset?: string;
  entityType?: string; fromDate?: string;
  toDate?: string;
  entity?: string;
  currencyUuid?: string;
  chapterUuid?: string;
  courseUuid?: string;
  entityParentId?: string;
  educationalLevel?: string;
  subjectUuid?: string
  lecturerUuid?: string
}



// export type Filter = {
//   key: string;
//   options?: Array;
//   title: string;
//   getFunction?: Function;
//   type?: FormItemType;
//   rangeStartKey?: string;
//   rangeEndKey?: string;
// };

