import { useState } from "react";
import { Box, Container } from "@mui/material";
import { CommentLine } from "../commentLine/commentLine";
import { Timer } from "../timer/Timer";
import { Project } from "../project/project";
import { useAtom } from "jotai";
import { projectsAtom } from "../settings/model";
import { CurrentTime } from "../currentTime/currentTime";
import "./App.css";

function App() {
  const [comment, setComment] = useState("");
  const [project, setProject] = useState("");
  const [projectsValue] = useAtom(projectsAtom);

  return (
    <Container maxWidth="sm">
      <Box className="app__underContainer">
        <Timer />
        <CommentLine comment={comment} setValue={setComment} />
        <Project
          value={project}
          setValue={setProject}
          valueList={projectsValue.split(",").map((item) => item.trim())}
        />
        <CurrentTime project={project} comment={comment} />
      </Box>
    </Container>
  );
}

export default App;
