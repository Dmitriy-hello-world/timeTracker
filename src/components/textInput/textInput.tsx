import { TextField } from "@mui/material";
import { textInputProps } from "./types";
import "./textInput.css";
import { useState, KeyboardEvent, useEffect, useRef } from "react";

export const TextInput = ({ name, setFunction, value }: textInputProps) => {
  const [combo, setCombo] = useState<string>("");
  const hotKeyInput = useRef<HTMLInputElement>(null);
  function mapKeys(key: string): string {
    switch (key) {
      case "Control":
        return "CommandOrControl";
      default:
        return key;
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();

    if (event.repeat) return;
    const mappedKey = mapKeys(event.key);

    setCombo((prev) => {
      if (!prev?.length) return mappedKey;

      return `${prev}+${mappedKey}`;
    });
  };

  const handleKeyUp = () => {
    if (combo?.length) {
      setFunction(combo);
      setCombo("");
    }
  };

  useEffect(() => {
    window.electron.on("press-btn", (_, { message }) => {
      setCombo(message);
    });

    return () => {
      window.electron?.removeAllListeners("press-btn");
    };
  }, []);

  return (
    <>
      {name === "Play/Pause" ? (
        <TextField
          sx={{ m: "30px 0 0 0" }}
          className="textInput"
          value={value}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          id="outlined-basic"
          label={name}
          ref={hotKeyInput}
          variant="standard"
        />
      ) : (
        <TextField
          sx={{ m: "30px 0 0 0" }}
          className="textInput"
          value={value}
          onChange={(e) => setFunction(e.target.value)}
          id="outlined-basic"
          label={name}
          variant="outlined"
        />
      )}
    </>
  );
};
