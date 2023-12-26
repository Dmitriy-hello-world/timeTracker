import { useState } from "react";
import { Box, Container } from "@mui/material";
import { CommentLine } from "../commentLine/commentLine";
import { Timer } from "../timer/Timer";
import { Project } from "../project/project";
import { useAtom } from "jotai";
import { projectsAtom } from "../settings/model";
import { CurrentTime } from "../currentTime/currentTime";
import { projectAtom } from "../project/model";
import "./App.css";
import { commentAtom } from "../commentLine/model";

function App() {
  const [projectValue] = useAtom(projectAtom);
  const [commentValue] = useAtom(commentAtom);
  const [projectsValue] = useAtom(projectsAtom);

  return (
    <Container maxWidth="sm">
      <Box className="app__underContainer">
        <Timer />
        <Project
          value={projectValue}
          valueList={projectsValue.split(",").map((item) => item.trim())}
          isInApp={true}
        />
        <CommentLine comment={commentValue} />
        <CurrentTime project={projectValue} comment={commentValue} />
      </Box>
    </Container>
  );
}

export default App;
