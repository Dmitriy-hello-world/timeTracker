export interface ProjectProps {
  isInApp: boolean;
  value: string;
  valueList: string[];
  reset?: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  setValue?: (str: string) => void;
  totalSeconds?: number;
}
