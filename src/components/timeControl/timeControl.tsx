import {
  Box,
  Button,
  Container,
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

export const TimeControl = () => {
  const [stateValue] = useAtom<localStorageTime[]>(timesArrAtom);
  const setTimesValue = useSetAtom(timesArrAtom);

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TimeList state={stateValue} />
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
    </Container>
  );
};
