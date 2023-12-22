import { atom } from "jotai";
import { HandleSaveTimeParams } from "./types";
import { combineObjects } from "../timeList/lib";
import { nanoid } from "nanoid";

export const timeDurationAtom = atom(0);
export const theLatestTimeIDAtom = atom(
  window.localStorage.getItem("latestId") || nanoid()
);

export const createSaveTimeObjFunc = () => {
  return ({
    comment,
    name,
    project,
    time,
    date,
    prewState,
    setState,
    theLatestId,
  }: HandleSaveTimeParams) => {
    const obj = {
      name,
      date,
      time,
      project,
      comment,
      id: theLatestId,
    };

    const optimizedArr = combineObjects(
      [...prewState, obj].sort((a, b) => b.date - a.date),
      theLatestId
    );

    setState(optimizedArr);

    window.localStorage.removeItem("times");
    window.localStorage.setItem("times", JSON.stringify(optimizedArr));
  };
};
