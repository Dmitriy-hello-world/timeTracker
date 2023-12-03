import { combineObjects } from "./lib";
import { localStorageTime } from "./types";

export const useGetTimesFromLocalStorage = () => {
  const arr: localStorageTime[] = JSON.parse(
    window.localStorage.getItem("times") || "[]"
  );

  const optimizedArr = combineObjects(arr.sort((a, b) => b.date - a.date));

  window.localStorage.removeItem("times");
  window.localStorage.setItem("times", JSON.stringify(optimizedArr));

  return optimizedArr;
};
