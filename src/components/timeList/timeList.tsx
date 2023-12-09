import { TableRow, TableCell, IconButton } from "@mui/material";
import { useGetTimesFromLocalStorage } from "./model";
import { localStorageTime } from "./types";
import { getTime } from "./lib";
import EditIcon from "@mui/icons-material/Edit";

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
            <IconButton>
              <EditIcon />
            </IconButton>
          </TableCell>
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
