import { combineObjects, getTime } from "../timeList/lib";
import { CancelFunProps, SaveFunProps } from "./types";

export const timeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds || 0;
};

export const cancelEditMode = ({
  time,
  setCurrentComment,
  setCurrentDate,
  setCurrentName,
  setCurrentTime,
  setProject,
}: CancelFunProps) => {
  setCurrentComment(time.comment);
  setCurrentDate(new Date(time.date));
  setCurrentName(time.name);
  setCurrentTime(getTime(time.time));
  setProject(time.project);
};

export const generateSaveEditMode = () => {
  return ({
    currentComment,
    currentDate,
    currentName,
    currentTime,
    project,
    id,
    prewState,
    setState,
  }: SaveFunProps) => {
    const newArr = prewState.map((time) => {
      if (time.id === id) {
        return {
          name: currentName,
          comment: currentComment,
          date: currentDate,
          time: currentTime,
          project: project,
          id,
        };
      } else {
        return time;
      }
    });

    const optimizedArr = combineObjects(newArr.sort((a, b) => b.date - a.date));

    setState(optimizedArr);

    window.localStorage.removeItem("times");
    window.localStorage.setItem("times", JSON.stringify(optimizedArr));
  };
};
