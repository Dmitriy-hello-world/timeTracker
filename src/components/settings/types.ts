import { NavigateFunction } from "react-router-dom";

export interface settingsParams {
  name: string;
  link: string;
  projects: string;
  btn: string;
  navigate: NavigateFunction;
  setNameAtom: (str: string) => void;
  setLinkAtom: (str: string) => void;
  setProjectsAtom: (str: string) => void;
  setBtnAtom: (str: string) => void;
}
