export interface CommentLineProps {
  comment: string;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
}
