export interface localStorageTime {
  name: string;
  comment: string;
  date: number;
  time: number;
  project: string;
  id: string;
}

export interface timeListProps {
  state: localStorageTime[];
  page: number;
}
