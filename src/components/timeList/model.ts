import { atom } from "jotai";

export const timesArrAtom = atom(
  JSON.parse(window.localStorage.getItem("times") || "[]")
);
