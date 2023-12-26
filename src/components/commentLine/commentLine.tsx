import { Box } from "@mui/material";
import { CustomTextArea } from "../customTextArea/customTextArea";
import { CommentLineProps } from "./types";
import { useSetAtom } from "jotai";
import { theLatestTimeIDAtom } from "../currentTime/model";
import "./commentLine.css";
import { nanoid } from "nanoid";
import { commentAtom } from "./model";

export const CommentLine = ({ comment }: CommentLineProps) => {
  const setTheLatestIdAtom = useSetAtom(theLatestTimeIDAtom);
  const setCommentAtom = useSetAtom(commentAtom);

  const handleSetValue = (val: string) => {
    const id = nanoid();
    setCommentAtom(val);
    setTheLatestIdAtom(id);
    window.localStorage.setItem("comment", val);
    window.localStorage.setItem("latestId", id);
  };

  return (
    <Box className="commentLine__wrapper">
      <CustomTextArea comment={comment} setValue={handleSetValue} />
    </Box>
  );
};
