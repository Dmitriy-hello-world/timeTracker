import { Box } from "@mui/material";
import { CustomTextArea } from "../customTextArea/customTextArea";
import { CommentLineProps } from "./types";
import "./commentLine.css";

export const CommentLine = ({ comment, setValue }: CommentLineProps) => {
  return (
    <Box className="commentLine__wrapper">
      <CustomTextArea comment={comment} setValue={setValue} />
    </Box>
  );
};
