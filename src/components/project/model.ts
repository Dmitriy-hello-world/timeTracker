import { atom } from "jotai";

export const projectAtom = atom(window.localStorage.getItem("project") || "");
