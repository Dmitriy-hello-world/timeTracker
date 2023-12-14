import {
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TimeList } from "../timeList/timeList";
import "./timeControl.css";
import { useAtom, useSetAtom } from "jotai";
import { timesArrAtom } from "../timeList/model";
import { localStorageTime } from "../timeList/types";
import { handleSaveTimeToServer } from "./lib";
import { useState } from "react";

export const TimeControl = () => {
  const [stateValue] = useAtom<localStorageTime[]>(timesArrAtom);
  const setTimesValue = useSetAtom(timesArrAtom);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      <TableContainer sx={{ minHeight: "570px" }} component={Paper}>
        <Table sx={{ minWidth: "650px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Project</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TimeList state={stateValue} page={page} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="timeControl__btn">
        <Button
          color="info"
          variant="contained"
          onClick={() =>
            handleSaveTimeToServer({
              setState: setTimesValue,
              state: stateValue,
            })
          }
        >
          Save time to server
        </Button>
      </Box>
      {stateValue.length > 7 && (
        <Box className="timeControl__pagination">
          <Pagination
            count={
              (stateValue.length - (stateValue.length % 7)) / 7 +
              (stateValue.length % 7 !== 0 ? 1 : 0)
            }
            page={page}
            onChange={handleChange}
          />
        </Box>
      )}
    </Container>
  );
};
