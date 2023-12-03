import { useEffect, useState } from "react";
import { TextInput } from "../textInput/textInput";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { handleSaveSettings, useGetGlobalState } from "./model";
import "./settings.css";

export const Settings = () => {
  const {
    linkValue,
    nameValue,
    btnValue,
    navigate,
    projectsValue,
    setLinkAtom,
    setNameAtom,
    setProjectsAtom,
    setBtnAtom,
  } = useGetGlobalState();
  const [name, setName] = useState(nameValue);
  const [link, setLink] = useState(linkValue);
  const [projects, setProjects] = useState(projectsValue);
  const [btn, setBtn] = useState(btnValue);

  useEffect(() => {
    window.electron.send("hotKey", { message: btnValue });
  }, []);

  return (
    <Container maxWidth="sm">
      <TextInput name="Name and Surname" value={name} setFunction={setName} />
      <TextInput name="Link to Server" value={link} setFunction={setLink} />
      <TextInput name="Projects" value={projects} setFunction={setProjects} />
      <TextInput name="Play/Pause" value={btn} setFunction={setBtn} />
      <Box className="settings__buttons">
        <Button
          sx={{ m: "30px 10px 0 0" }}
          onClick={() =>
            handleSaveSettings({
              name,
              link,
              projects,
              navigate,
              setLinkAtom,
              setNameAtom,
              setProjectsAtom,
              btn,
              setBtnAtom,
            })
          }
          className="settings__button"
          variant="contained"
          disabled={
            name === nameValue &&
            link === linkValue &&
            projects === projectsValue &&
            btn === btnValue
          }
        >
          Save
        </Button>
        <Link to="/">
          <Button
            sx={{ m: "30px 10px 0 0" }}
            className="settings__button"
            variant="contained"
            onClick={() => {
              setName(nameValue);
              setLink(linkValue);
              setProjects(projectsValue);
              setBtn(btnValue);
            }}
          >
            Cancel
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
