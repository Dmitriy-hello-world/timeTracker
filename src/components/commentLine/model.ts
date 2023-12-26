import { atom } from "jotai";

export const commentAtom = atom(window.localStorage.getItem("comment") || "");
