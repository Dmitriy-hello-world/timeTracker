import { Stack } from "@mui/material";
import { getZero } from "./helpers";
import { ControlsButtons } from "../controlsButtons/controlsButtons";
import { CurrentTimeProps } from "./types";
import "./currentTime.css";

export const CurrentTime = ({
  project,
  comment,
  hours,
  minutes,
  pause,
  reset,
  seconds,
  start,
  isRunning,
  totalSeconds,
}: CurrentTimeProps) => {
  return (
    <>
      <Stack className="currentTime__wrapper" flexDirection="row">
        <div className="currentTime__title">Worked time -</div>
        <div>{getZero(hours)}:</div>
        <div>{getZero(minutes)}:</div>
        <div>{getZero(seconds)}</div>
        <ControlsButtons
          isRunning={isRunning}
          start={start}
          pause={pause}
          reset={reset}
          project={project}
          totalSeconds={totalSeconds}
          comment={comment}
        />
      </Stack>
      <Stack
        className="currentTime__wrapper"
        flexDirection="row"
        justifyContent="center"
      ></Stack>
    </>
  );
};
