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

function App() {
  const [projectValue] = useAtom(projectAtom);
  const [projectsValue] = useAtom(projectsAtom);

  const [comment, setComment] = useState("");

  return (
    <Container maxWidth="sm">
      <Box className="app__underContainer">
        <Timer />
        <Project
          value={projectValue}
          valueList={projectsValue.split(",").map((item) => item.trim())}
          isInApp={true}
        />
        <CommentLine comment={comment} setValue={setComment} />
        <CurrentTime project={projectValue} comment={comment} />
      </Box>
    </Container>
  );
}

export default App;
