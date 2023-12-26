import { TableRow } from "@mui/material";
import { timeListProps } from "./types";
import { TimeListItem } from "../timeListItem/timeListItem";

export const TimeList = ({ state, page }: timeListProps) => {
  return (
    <>
      {state
        .filter((item, i) => {
          if (i === (page - 1) * 7 || (i > (page - 1) * 7 && i < page * 7)) {
            return item;
          }
        })
        .map((time) => (
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
