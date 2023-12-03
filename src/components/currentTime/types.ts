export interface CurrentTimeProps {
  project: string;
  comment: string;
}

export interface HandleSaveTimeParams {
  name: string;
  date: number;
  time: number;
  project: string;
  comment: string;
}
