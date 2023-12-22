import { Box } from "@mui/material";
import { CustomTextArea } from "../customTextArea/customTextArea";
import { CommentLineProps } from "./types";
import { useSetAtom } from "jotai";
import { theLatestTimeIDAtom } from "../currentTime/model";
import "./commentLine.css";
import { nanoid } from "nanoid";

export const CommentLine = ({ comment, setValue }: CommentLineProps) => {
  const setTheLatestIdAtom = useSetAtom(theLatestTimeIDAtom);
  const handleSetValue = (val: string) => {
    const id = nanoid();
    setValue(val);
    setTheLatestIdAtom(id);
    window.localStorage.setItem("latestId", id);
  };

  return (
    <Box className="commentLine__wrapper">
      <CustomTextArea comment={comment} setValue={handleSetValue} />
    </Box>
  );
};
