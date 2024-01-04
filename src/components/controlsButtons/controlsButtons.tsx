import { Box, Button } from "@mui/material";
import { ControlsButtonsProps } from "./types";
import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { nameAtom } from "../settings/model";
import {
  createSaveTimeObjFunc,
  theLatestTimeIDAtom,
} from "../currentTime/model";
import { timesArrAtom } from "../timeList/model";
import { localStorageTime } from "../timeList/types";
import "./controlsButtons.css";

export const ControlsButtons = ({
  isRunning,
  pause,
  reset,
  start,
  project,
  totalSeconds,
  comment,
}: ControlsButtonsProps) => {
  const [nameValue] = useAtom(nameAtom);
  const stopBtn = useRef<HTMLButtonElement>(null);
  const startBtn = useRef<HTMLButtonElement>(null);
  const handleSaveTimeObj = createSaveTimeObjFunc();
  const [prewState] = useAtom<localStorageTime[]>(timesArrAtom);
  const setTimesValue = useSetAtom(timesArrAtom);
  const [theLatestId] = useAtom(theLatestTimeIDAtom);

  useEffect(() => {
    window.electron.on("timer-start", () => {
      if (startBtn.current) {
        startBtn.current.click();
      } else if (stopBtn.current) {
        stopBtn.current.click();
      }
    });

    return () => {
      window.electron?.removeAllListeners("timer-start");
    };
  }, []);

  useEffect(() => {
    window.electron.send("getTime");
    console.log("get Time");
    window.electron.on("afterGet", (_, timeInLocalStor) => {
      if (+timeInLocalStor.data.value && +timeInLocalStor.data.value > 0) {
        console.log("after get");
        handleSaveTimeObj({
          comment,
          date: Date.now(),
          name: nameValue,
          project,
          time: +timeInLocalStor.data.value,
          prewState,
          setState: setTimesValue,
          theLatestId,
        });
        window.electron.send("resetTime");
      }
    });

    return () => {
      window.electron?.removeAllListeners("afterGet");
    };
  }, []);

  useEffect(() => {
    if (totalSeconds % 10 === 0 && totalSeconds !== 0) {
      window.electron.send("setTime", totalSeconds);
    }
  }, [totalSeconds]);

  return (
    <Box className="controlButtons__wrapper">
      {isRunning ? (
        <Button
          ref={stopBtn}
          color="error"
          variant="contained"
          className="controlButtons__button controlButtons__button_stop"
          onClick={() => {
            pause();
            handleSaveTimeObj({
              comment,
              date: Date.now(),
              name: nameValue,
              project,
              time: totalSeconds,
              prewState,
              setState: setTimesValue,
              theLatestId,
            });
            window.electron.send("resetTime");
            reset(new Date(), false);
          }}
        >
          Stop
        </Button>
      ) : (
        <Button
          ref={startBtn}
          color="success"
          variant="contained"
          className="controlButtons__button controlButtons__button_start"
          onClick={() => {
            start();
          }}
          disabled={!nameValue || !project}
        >
          Start
        </Button>
      )}
    </Box>
  );
};
