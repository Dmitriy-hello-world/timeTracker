import { TextField } from "@mui/material";
import { CustomTextAreaProps } from "./types";
import "./customTextArea.css";

export const CustomTextArea = ({ comment, setValue }: CustomTextAreaProps) => {
  return (
    <TextField
      className="customTextArea__text"
      id="outlined-multiline-flexible"
      label="Comment"
      multiline
      value={comment}
      onChange={(e) => {
        if (e.target.value.length > 100) {
          return;
        } else {
          setValue(e.target.value);
        }
      }}
      maxRows={3}
    />
  );
};
