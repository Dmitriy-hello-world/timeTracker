import { TableRow, TableCell } from "@mui/material";
import { useGetTimesFromLocalStorage } from "./model";
import { localStorageTime } from "./types";
import { getTime } from "./lib";

export const TimeList = () => {
  const timesArr: localStorageTime[] = useGetTimesFromLocalStorage();

  return (
    <>
      {timesArr.map((time, i) => (
        <TableRow
          key={i}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {time.project}
          </TableCell>
          <TableCell align="left">
            {Intl.DateTimeFormat("ua").format(time.date)}
          </TableCell>
          <TableCell align="left">{getTime(time.time)}</TableCell>
          <TableCell align="left">{time.name}</TableCell>
          <TableCell align="left">{time.comment}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
