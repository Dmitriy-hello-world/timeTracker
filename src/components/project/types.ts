export interface ProjectProps {
  isInApp: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  valueList: string[];
}
