import { useEffect, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import TimerIcon from "@mui/icons-material/Timer";
import { NavLink } from "react-router-dom";
import "./appHeader.css";
import { useAtom } from "jotai";
import { handleSaveTimeObj, timeDurationAtom } from "../currentTime/model";
import { nameAtom } from "../settings/model";
import { currentCommentAtom, currentProjectAtom } from "../app/model";

export const AppHeader = () => {
  const [crossColor, setCrossColor] = useState<"action" | "error">("action");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeDurationValue] = useAtom(timeDurationAtom);
  const [nameValue] = useAtom(nameAtom);
  const [currentCommentValue] = useAtom(currentCommentAtom);
  const [currentProjectValue] = useAtom(currentProjectAtom);

  useEffect(() => {
    window.electron.on("unmaximize", (_, {}) => {
      setIsFullScreen(false);
    });

    window.electron.on("maximize", (_, {}) => {
      setIsFullScreen(true);
    });

    return () => {
      window.electron?.removeAllListeners("unmaximize");
      window.electron?.removeAllListeners("maximize");
    };
  }, []);

  useEffect(() => {
    window.electron.on("willClose", (_, {}) => {
      if (
        nameValue !== "" &&
        currentProjectValue !== "" &&
        timeDurationValue !== 0
      ) {
        handleSaveTimeObj({
          comment: currentCommentValue,
          date: Date.now(),
          name: nameValue,
          project: currentProjectValue,
          time: timeDurationValue,
        });
      }
    });

    return () => {
      window.electron?.removeAllListeners("willClose");
    };
  }, [timeDurationValue, currentCommentValue, nameValue, currentProjectValue]);

  return (
    <Box className="appHeader__wrapper">
      <Stack className="appHeader__icons" flexDirection="row">
        <NavLink
          className={({ isActive }) =>
            isActive ? "appHeader__control_active" : "appHeader__control"
          }
          to="/"
        >
          <HomeIcon sx={{ width: "28px", height: "28px" }} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "appHeader__control_active" : "appHeader__control"
          }
          to="/time"
        >
          <TimerIcon sx={{ width: "28px", height: "28px", ml: "4px" }} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "appHeader__control_active" : "appHeader__control"
          }
          to="/settings"
        >
          <SettingsIcon sx={{ width: "28px", height: "28px", ml: "8px" }} />
        </NavLink>
      </Stack>
      <Stack flexDirection="row">
        <IconButton onClick={() => window.electron.send("minimizeApp")}>
          <MinimizeIcon className="appHeader__item" />
        </IconButton>
        {isFullScreen ? (
          <IconButton
            onClick={() => {
              setIsFullScreen(false);
              window.electron.send("restoreWindow");
            }}
          >
            <CloseFullscreenIcon className="appHeader__item" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsFullScreen(true);
              window.electron.send("maximizeWindow");
            }}
          >
            <OpenInFullIcon className="appHeader__item" />
          </IconButton>
        )}
        <IconButton
          onClick={() => window.electron.send("closeApp")}
          onMouseLeave={() => setCrossColor("action")}
          onMouseEnter={() => setCrossColor("error")}
        >
          <CloseIcon className="appHeader__item" color={crossColor} />
        </IconButton>
      </Stack>
    </Box>
  );
};
