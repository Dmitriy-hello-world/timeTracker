import { TableCell, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { getTime } from "../timeList/lib";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { TimeListItemProps } from "./types";
import { Project } from "../project/project";
import { useAtom, useSetAtom } from "jotai";
import { projectsAtom } from "../settings/model";
import { cancelEditMode, generateSaveEditMode, timeToSeconds } from "./helpers";
import { timesArrAtom } from "../timeList/model";
import { localStorageTime } from "../timeList/types";

export const TimeListItem = (time: TimeListItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectsValue] = useAtom(projectsAtom);
  const [project, setProject] = useState(time.project);
  const [currentDate, setCurrentDate] = useState(new Date(time.date));
  const [currentName, setCurrentName] = useState(time.name);
  const [currentComment, setCurrentComment] = useState(time.comment);
  const [currentTime, setCurrentTime] = useState(getTime(time.time));
  const [prewState] = useAtom<localStorageTime[]>(timesArrAtom);
  const setTimesValue = useSetAtom(timesArrAtom);

  const saveEditMode = generateSaveEditMode();

  return (
    <>
      {isEditMode ? (
        <>
          <TableCell component="th" scope="row">
            <IconButton
              onClick={() => {
                saveEditMode({
                  currentComment,
                  currentDate: currentDate.getTime(),
                  currentName,
                  currentTime: timeToSeconds(currentTime),
                  project,
                  id: time.id,
                  prewState,
                  setState: setTimesValue,
                });
                setIsEditMode(false);
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                cancelEditMode({
                  time,
                  setCurrentComment,
                  setCurrentDate,
                  setCurrentName,
                  setCurrentTime,
                  setProject,
                });
                setIsEditMode(false);
              }}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
          <TableCell sx={{ width: "150px" }} component="th" scope="row">
            <Project
              value={project}
              setValue={setProject}
              valueList={projectsValue.split(",").map((item) => item.trim())}
              isInApp={false}
            />
          </TableCell>
          <TableCell align="left">
            <TextField
              value={currentDate.toISOString().slice(0, 10)}
              onChange={(e) => setCurrentDate(new Date(e.target.value))}
              type="date"
              id="standard-basic"
              variant="standard"
            />
          </TableCell>
          <TableCell align="left">
            <TextField
              value={currentTime}
              onChange={(e) => {
                let value = e.target.value;

                value = value.replace(/\D/g, "");
                value = value.slice(0, 6);

                if (value.length <= 2) {
                  value = value.replace(/(\d{0,2})/, "$1");
                } else if (value.length <= 4) {
                  value = value.replace(/(\d{2})(\d{0,2})/, "$1:$2");
                } else {
                  value = value.replace(/(\d{2})(\d{2})(\d{0,2})/, "$1:$2:$3");
                }

                setCurrentTime(value);
              }}
              sx={{ width: "150px", height: "40px" }}
              id="standard-basic"
              variant="standard"
            />
          </TableCell>
          <TableCell align="left">
            <TextField
              sx={{ width: "150px", height: "40px" }}
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              id="standard-basic"
              variant="standard"
            />
          </TableCell>
          <TableCell align="left">
            <TextField
              sx={{ width: "150px", height: "40px" }}
              value={currentComment}
              onChange={(e) =>
                setCurrentComment(
                  e.target.value.length > 100 ? currentComment : e.target.value
                )
              }
              id="standard-basic"
              variant="standard"
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell component="th" scope="row">
            <IconButton onClick={() => setIsEditMode(true)}>
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {time.project}
          </TableCell>
          <TableCell align="left">
            {Intl.DateTimeFormat("ua").format(time.date)}
          </TableCell>
          <TableCell align="left">{getTime(time.time)}</TableCell>
          <TableCell align="left">{time.name}</TableCell>
          <TableCell align="left">{time.comment}</TableCell>
        </>
      )}
    </>
  );
};
