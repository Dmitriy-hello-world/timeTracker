import { getZero } from "../currentTime/heplers";
import { localStorageTime } from "./types";

export const getTime = (seconds: number): string => {
  const h = getZero(Math.floor((seconds / (1 * 60 * 60)) % 24));
  const m = getZero(Math.floor((seconds / (1 * 60)) % 60));
  const s = getZero(Math.floor((seconds / 1) % 60));
  return `${h}:${m}:${s}`;
};

export const combineObjects = (data: localStorageTime[]) => {
  const groupedObjects: Record<string, localStorageTime> = {};

  data.forEach((obj) => {
    const key = `${Intl.DateTimeFormat("ua").format(obj.date)}_${obj.comment}_${
      obj.project
    }`;
    if (!groupedObjects[key]) {
      groupedObjects[key] = { ...obj };
    } else {
      groupedObjects[key].time += obj.time;
    }
  });

  const result = Object.values(groupedObjects);
  return result;
};
