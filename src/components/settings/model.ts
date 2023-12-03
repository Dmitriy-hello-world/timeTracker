import { atom, useAtom, useSetAtom } from "jotai";
import { settingsParams } from "./types";
import { useNavigate } from "react-router-dom";

export const nameAtom = atom(window.localStorage.getItem("name") || "");
export const linkAtom = atom(window.localStorage.getItem("link") || "");
export const projectsAtom = atom(window.localStorage.getItem("projects") || "");
export const btnAtom = atom(
  window.localStorage.getItem("btn") || "CommandOrControl+P"
);

export const handleSaveSettings = ({
  name,
  link,
  projects,
  btn,
  navigate,
  setNameAtom,
  setLinkAtom,
  setProjectsAtom,
  setBtnAtom,
}: settingsParams) => {
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("link", link);
  window.localStorage.setItem("projects", projects);
  window.localStorage.setItem("btn", btn);

  setNameAtom(name);
  setLinkAtom(link);
  setProjectsAtom(projects);
  setBtnAtom(btn);

  window.electron.send("hotKey", { message: btn });

  navigate("/");
};

export const useGetGlobalState = () => {
  const navigate = useNavigate();
  const setNameAtom = useSetAtom(nameAtom);
  const setLinkAtom = useSetAtom(linkAtom);
  const setProjectsAtom = useSetAtom(projectsAtom);
  const [nameValue] = useAtom(nameAtom);
  const [linkValue] = useAtom(linkAtom);
  const [projectsValue] = useAtom(projectsAtom);
  const setBtnAtom = useSetAtom(btnAtom);
  const [btnValue] = useAtom(btnAtom);

  return {
    navigate,
    setNameAtom,
    setLinkAtom,
    setProjectsAtom,
    nameValue,
    linkValue,
    projectsValue,
    btnValue,
    setBtnAtom,
  };
};
