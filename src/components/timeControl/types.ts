import { localStorageTime } from "../timeList/types";

export interface handleSaveTimeToServerProps {
  state: localStorageTime[];
  setState: (data: any) => void;
}
