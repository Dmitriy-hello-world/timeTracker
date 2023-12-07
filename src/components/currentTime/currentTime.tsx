import { Button, Stack } from "@mui/material";
import { getZero } from "./helpers";
import { ControlsButtons } from "../controlsButtons/controlsButtons";
import { useStopwatch } from "react-timer-hook";
import { handleSaveTimeObj, timeDurationAtom } from "./model";
import { CurrentTimeProps } from "./types";
import { useAtom, useSetAtom } from "jotai";
import { nameAtom } from "../settings/model";
import { useEffect } from "react";
import "./currentTime.css";

export const CurrentTime = ({ project, comment }: CurrentTimeProps) => {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    totalSeconds,
  } = useStopwatch();

  const [nameValue] = useAtom(nameAtom);
  const setTimeDurationAtom = useSetAtom(timeDurationAtom);

  useEffect(() => {
    setTimeDurationAtom(totalSeconds);
  }, [totalSeconds]);

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
        />
      </Stack>
      <Stack
        className="currentTime__wrapper"
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          className="currentTime__saveBtn"
          color="info"
          variant="contained"
          sx={{ m: "15px 0" }}
          onClick={() => {
            handleSaveTimeObj({
              comment,
              date: Date.now(),
              name: nameValue,
              project,
              time: totalSeconds,
            });
            reset(new Date(), false);
          }}
          disabled={project === "" || totalSeconds === 0}
        >
          Save Time
        </Button>
      </Stack>
    </>
  );
};
