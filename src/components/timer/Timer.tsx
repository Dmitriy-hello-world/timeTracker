import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./timer.css";

export const Timer = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Box className="timer__wrapper">
      <span>Date: {date.toLocaleDateString()}</span>
      <span>Time: {date.toLocaleTimeString()}</span>
    </Box>
  );
};
