import {
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

export const TimeControl = () => {
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
            <TimeList />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
