import { Box, Button } from "@mui/material";
import { ControlsButtonsProps } from "./types";
import "./controlsButtons.css";
import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  getTimesFromLocalStor,
  resetTimesInLocalStor,
  saveTimesToLocalStor,
} from "../currentTime/helpers";
import { nameAtom } from "../settings/model";
import {
  createSaveTimeObjFunc,
  theLatestTimeIDAtom,
} from "../currentTime/model";
import { timesArrAtom } from "../timeList/model";
import { localStorageTime } from "../timeList/types";
import { isFirstTimeAtom } from "./model";

export const ControlsButtons = ({
  isRunning,
  pause,
  reset,
  start,
  project,
  totalSeconds,
  comment,
}: ControlsButtonsProps) => {
  const [isFirstTimeAtomValue] = useAtom(isFirstTimeAtom);
  const setIsFirstTimeAtom = useSetAtom(isFirstTimeAtom);
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

    if (isFirstTimeAtomValue) {
      if (getTimesFromLocalStor() !== 0) {
        const stopwatchOffset = new Date();
        stopwatchOffset.setSeconds(
          stopwatchOffset.getSeconds() + getTimesFromLocalStor()
        );

        reset(stopwatchOffset, false);
      }
    }

    return () => {
      window.electron?.removeAllListeners("timer-start");
    };
  }, []);

  useEffect(() => {
    saveTimesToLocalStor(totalSeconds);
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
            if (isFirstTimeAtomValue) {
              setIsFirstTimeAtom(false);
              start();
            } else {
              reset(new Date(), false);
              resetTimesInLocalStor();
              start();
            }
          }}
          disabled={!nameValue || !project}
        >
          Start
        </Button>
      )}
    </Box>
  );
};
