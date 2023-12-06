import { Box, Button } from "@mui/material";
import { ControlsButtonsProps } from "./types";
import "./controlsButtons.css";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { timeDurationAtom } from "../currentTime/model";

export const ControlsButtons = ({
  isRunning,
  pause,
  reset,
  start,
}: ControlsButtonsProps) => {
  const [timeDuration] = useAtom(timeDurationAtom);
  const stopBtn = useRef<HTMLButtonElement>(null);
  const startBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.electron.on("timer-start", () => {
      if (startBtn.current) {
        startBtn.current.click();
      } else if (stopBtn.current) {
        stopBtn.current.click();
      }
    });

    if (timeDuration !== 0) {
      const stopwatchOffset = new Date();
      stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timeDuration);

      reset(stopwatchOffset, false);
    }

    return () => {
      window.electron?.removeAllListeners("timer-start");
    };
  }, []);

  return (
    <Box className="controlButtons__wrapper">
      {isRunning ? (
        <Button
          ref={stopBtn}
          color="error"
          variant="contained"
          className="controlButtons__button controlButtons__button_stop"
          onClick={pause}
        >
          Pause
        </Button>
      ) : (
        <Button
          ref={startBtn}
          color="success"
          variant="contained"
          className="controlButtons__button controlButtons__button_start"
          onClick={start}
        >
          Start
        </Button>
      )}
      <Button
        color="info"
        variant="contained"
        className="controlButtons__button controlButtons__button_cancel"
        onClick={() => reset(new Date(), false)}
      >
        Reset
      </Button>
    </Box>
  );
};
