import { getZero } from "../currentTime/helpers";
import { localStorageTime } from "./types";

export const getTime = (seconds: number): string => {
  const h = getZero(Math.floor((seconds / (1 * 60 * 60)) % 24));
  const m = getZero(Math.floor((seconds / (1 * 60)) % 60));
  const s = getZero(Math.floor((seconds / 1) % 60));
  return `${h}:${m}:${s}`;
};

export const combineObjects = (data: localStorageTime[], currentId: string) => {
  const groupedObjects: Record<string, localStorageTime> = {};

  data.forEach((obj) => {
    const key = `${obj.id}_${Intl.DateTimeFormat("ua").format(obj.date)}_${
      obj.comment
    }_${obj.project}`;
    if (obj.id === currentId) {
      if (!groupedObjects[key]) {
        groupedObjects[key] = { ...obj, id: currentId };
      } else {
        groupedObjects[key].time += obj.time;
      }
    } else {
      groupedObjects[key] = obj;
    }
  });

  return Object.values(groupedObjects);
};
