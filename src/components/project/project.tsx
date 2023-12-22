import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProjectProps } from "./types";
import { useSetAtom } from "jotai";
import { projectAtom } from "./model";
import { theLatestTimeIDAtom } from "../currentTime/model";
import { nanoid } from "nanoid";
import "./project.css";

export const Project = ({ value, valueList, isInApp }: ProjectProps) => {
  const setProjectAtom = useSetAtom(projectAtom);
  const setTheLatestIdAtom = useSetAtom(theLatestTimeIDAtom);

  const useSetProject = (val: string) => {
    const id = nanoid();
    setProjectAtom(val);
    setTheLatestIdAtom(id);
    window.localStorage.setItem("project", val);
    window.localStorage.setItem("latestId", id);
  };

  return (
    <FormControl sx={{ m: "20px 0" }} className="project__wrapper">
      <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
      <Select
        sx={isInApp ? {} : { height: "40px", width: "150px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Project Name"
        onChange={(e) => useSetProject(e.target.value)}
      >
        {valueList.map((item, i) => {
          return (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
