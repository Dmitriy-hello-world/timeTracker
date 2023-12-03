import { HandleSaveTimeParams } from "./types";

export const handleSaveTimeObj = ({
  comment,
  name,
  project,
  time,
  date,
}: HandleSaveTimeParams) => {
  const obj = {
    name,
    date,
    time,
    project,
    comment,
  };

  const prewState = JSON.parse(window.localStorage.getItem("times") || "[]");

  window.localStorage.setItem("times", JSON.stringify([...prewState, obj]));
};
