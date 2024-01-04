import { Box } from "@mui/material";
import { CustomTextArea } from "../customTextArea/customTextArea";
import { CommentLineProps } from "./types";
import { useSetAtom } from "jotai";
import { commentAtom } from "./model";
import "./commentLine.css";

export const CommentLine = ({ comment }: CommentLineProps) => {
  const setCommentAtom = useSetAtom(commentAtom);

  const handleSetValue = (val: string) => {
    setCommentAtom(val);
    window.localStorage.setItem("comment", val);
  };

  return (
    <Box className="commentLine__wrapper">
      <CustomTextArea comment={comment} setValue={handleSetValue} />
    </Box>
  );
};
