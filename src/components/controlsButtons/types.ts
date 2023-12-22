export interface ControlsButtonsProps {
  start: () => void;
  pause: () => void;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  isRunning: boolean;
  project: string;
  totalSeconds: number;
  comment: string;
}
