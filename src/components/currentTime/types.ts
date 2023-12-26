import { localStorageTime } from "../timeList/types";

export interface CurrentTimeProps {
  project: string;
  comment: string;
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  totalSeconds: number;
}

export interface HandleSaveTimeParams {
  name: string;
  date: number;
  time: number;
  project: string;
  comment: string;
  prewState: localStorageTime[];
  setState: (data: any) => void;
  theLatestId: string;
}
