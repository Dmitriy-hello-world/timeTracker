export interface ProjectProps {
  isInApp: boolean;
  value: string;
  valueList: string[];
  setValue?: (str: string) => void;
}
