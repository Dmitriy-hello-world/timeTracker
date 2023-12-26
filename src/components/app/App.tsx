import { Box, Container } from "@mui/material";
import { CommentLine } from "../commentLine/commentLine";
import { Timer } from "../timer/Timer";
import { Project } from "../project/project";
import { useAtom } from "jotai";
import { projectsAtom } from "../settings/model";
import { CurrentTime } from "../currentTime/currentTime";
import { projectAtom } from "../project/model";
import { commentAtom } from "../commentLine/model";
import { useStopwatch } from "react-timer-hook";
import "./App.css";

function App() {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
    totalSeconds,
    isRunning,
  } = useStopwatch();
  const [projectValue] = useAtom(projectAtom);
  const [commentValue] = useAtom(commentAtom);
  const [projectsValue] = useAtom(projectsAtom);

  return (
    <Container maxWidth="sm">
      <Box className="app__underContainer">
        <Timer />
        <Project
          reset={reset}
          value={projectValue}
          valueList={projectsValue.split(",").map((item) => item.trim())}
          isInApp={true}
        />
        <CommentLine reset={reset} comment={commentValue} />
        <CurrentTime
          project={projectValue}
          comment={commentValue}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          isRunning={isRunning}
          start={start}
          pause={pause}
          reset={reset}
          totalSeconds={totalSeconds}
        />
      </Box>
    </Container>
  );
}

export default App;
