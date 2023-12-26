import { Box, Button } from "@mui/material";
import { ControlsButtonsProps } from "./types";
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
    console.log("sended");
    window.electron.on("afterGet", (_, timeInLocalStor) => {
      if (+timeInLocalStor.data.value) {
        console.log(+timeInLocalStor.data.value);
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
        // need reset here
      }
    });

    return () => {
      window.electron?.removeAllListeners("afterGet");
    };
  }, []);

  useEffect(() => {
    window.electron.send("set");
  }, []);
  // useEffect(() => {
  //   console.log(1);
  //   const timeInLocalStor = getTimesFromLocalStor();
  //   console.log(2);
  //   console.log(comment);
  //   console.log(Date.now());

  //   console.log(nameValue);

  //   console.log(project);
  //   console.log(timeInLocalStor);
  //   console.log(totalSeconds);

  // if (timeInLocalStor !== 0) {
  //   handleSaveTimeObj({
  //     comment,
  //     date: Date.now(),
  //     name: nameValue,
  //     project,
  //     time: timeInLocalStor,
  //     prewState,
  //     setState: setTimesValue,
  //     theLatestId,
  //   });
  //     resetTimesInLocalStor();
  //   }
  // }, []);

  useEffect(() => {
    console.log(3);
    if (totalSeconds % 5 === 0 && totalSeconds !== 0) {
      console.log(4);
      // saveTimesToLocalStor(totalSeconds);
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
            resetTimesInLocalStor();
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
