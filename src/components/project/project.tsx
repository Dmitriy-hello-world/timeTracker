import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ProjectProps } from "./types";
import { useAtom, useSetAtom } from "jotai";
import { projectAtom } from "./model";
import {
  createSaveTimeObjFunc,
  theLatestTimeIDAtom,
} from "../currentTime/model";
import { nanoid } from "nanoid";
import "./project.css";
import { nameAtom } from "../settings/model";
import { commentAtom } from "../commentLine/model";
import { timesArrAtom } from "../timeList/model";
import { localStorageTime } from "../timeList/types";

export const Project = ({
  value,
  valueList,
  isInApp,
  setValue,
  reset,
  totalSeconds,
}: ProjectProps) => {
  const setProjectAtom = useSetAtom(projectAtom);
  const setTheLatestIdAtom = useSetAtom(theLatestTimeIDAtom);
  const handleSaveTimeObj = createSaveTimeObjFunc();
  const [nameValue] = useAtom(nameAtom);
  const [commentValue] = useAtom(commentAtom);
  const [prewState] = useAtom<localStorageTime[]>(timesArrAtom);
  const setTimesValue = useSetAtom(timesArrAtom);
  const [theLatestId] = useAtom(theLatestTimeIDAtom);

  const useSetProject = (val: string) => {
    if (totalSeconds && totalSeconds > 0) {
      handleSaveTimeObj({
        comment: commentValue,
        date: Date.now(),
        name: nameValue,
        project: value,
        time: totalSeconds,
        prewState,
        setState: setTimesValue,
        theLatestId,
      });
    }
    const id = nanoid();
    setProjectAtom(val);
    setTheLatestIdAtom(id);
    window.localStorage.setItem("project", val);
    window.localStorage.setItem("latestId", id);
    reset && reset(new Date(), false);
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
        onChange={
          isInApp
            ? (e) => useSetProject(e.target.value)
            : (e) => (setValue ? setValue(e.target.value) : null)
        }
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
