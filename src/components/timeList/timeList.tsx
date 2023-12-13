import { TableRow } from "@mui/material";
import { timeListProps } from "./types";
import { TimeListItem } from "../timeListItem/timeListItem";

export const TimeList = ({ state }: timeListProps) => {
  return (
    <>
      {state.map((time) => (
        <TableRow
          key={time.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TimeListItem {...time} />
        </TableRow>
      ))}
    </>
  );
};
