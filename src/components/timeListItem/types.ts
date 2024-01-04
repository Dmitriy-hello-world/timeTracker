import { localStorageTime } from "../timeList/types";

export interface TimeListItemProps {
  name: string;
  comment: string;
  date: number;
  time: number;
  project: string;
  id: string;
}

export interface CancelFunProps {
  time: TimeListItemProps;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentName: React.Dispatch<React.SetStateAction<string>>;
  setCurrentComment: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<string>>;
}

export interface SaveFunProps {
  project: string;
  currentDate: number;
  currentName: string;
  currentComment: string;
  currentTime: number;
  id: string;
  prewState: localStorageTime[];
  setState: (data: any) => void;
  theLatestId: string;
}

export interface DeleteFunProps {
  id: string;
  prewState: localStorageTime[];
  setState: (data: any) => void;
}
