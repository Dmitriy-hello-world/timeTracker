import { useState } from "react";
import { Box, Container } from "@mui/material";
import { CommentLine } from "../commentLine/commentLine";
import { Timer } from "../timer/Timer";
import { Project } from "../project/project";
import { useAtom, useSetAtom } from "jotai";
import { projectsAtom } from "../settings/model";
import { CurrentTime } from "../currentTime/currentTime";
import { currentCommentAtom, currentProjectAtom } from "./model";
import "./App.css";

function App() {
  const [projectsValue] = useAtom(projectsAtom);
  const [currentCommentValue] = useAtom(currentCommentAtom);
  const [currentProjectValue] = useAtom(currentProjectAtom);
  const setCurrentCommentValue = useSetAtom(currentCommentAtom);
  const setCurrentProjectValue = useSetAtom(currentProjectAtom);

  return (
    <Container maxWidth="sm">
      <Box className="app__underContainer">
        <Timer />
        <CommentLine
          comment={currentCommentValue}
          setValue={setCurrentCommentValue}
        />
        <Project
          value={currentProjectValue}
          setValue={setCurrentProjectValue}
          valueList={projectsValue.split(",").map((item) => item.trim())}
        />
        <CurrentTime
          project={currentProjectValue}
          comment={currentCommentValue}
        />
      </Box>
    </Container>
  );
}

export default App;
