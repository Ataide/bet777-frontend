import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    fontWeight: 700,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

function createData(
  date: string,
  hour: string,
  event: string,
  players: string,
  win: number,
  draw: number,
  lose: number
) {
  return { date, hour, event, players, win, draw, lose };
}

const rows = [
  createData(
    "15/09",
    "11:25",
    "Campeonato brasileiro",
    "Flamengo x Santos",
    2.4,
    4.0,
    1.2
  ),
  createData("15/09", "11:25", "Amistoso", "Flamengo x Santos", 3.7, 4.3, 1.2),
  createData(
    "15/09",
    "11:25",
    "Libertadores",
    "Flamengo x Santos",
    2.4,
    6.0,
    1.2
  ),
  createData(
    "15/09",
    "11:25",
    "Brasileirão Série C",
    "Flamengo x Santos",
    6.7,
    4.3,
    1.2
  ),
  createData(
    "15/09",
    "11:25",
    "Mundial de Clubes",
    "Flamengo x Santos",
    4.9,
    3.9,
    1.2
  ),
  createData(
    "15/09",
    "11:25",
    "Copa Sul-Americana",
    "Flamengo x Santos",
    4.9,
    3.9,
    1.2
  ),
];

export default function EventsTables() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead sx={{ height: "80px" }}>
          <TableRow>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              width={100}
            >
              Data
            </StyledTableCell>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              align="left"
            >
              Nome do evento
            </StyledTableCell>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              align="left"
            >
              Times
            </StyledTableCell>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              width={100}
              align="center"
            >
              1
            </StyledTableCell>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              width={100}
              align="center"
            >
              x
            </StyledTableCell>
            <StyledTableCell
              sx={{
                borderRight: "1px solid #2E2E2E",
              }}
              width={100}
              align="center"
            >
              2
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                sx={{
                  borderRight: "1px solid #7E7E7E",
                }}
                component="th"
                scope="row"
              >
                {row.date} <br />
                {row.hour}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  borderRight: "1px solid #7E7E7E",
                }}
                align="left"
              >
                {row.event}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  borderRight: "1px solid #7E7E7E",
                }}
                align="left"
              >
                {row.players}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button sx={{ p: 2 }} variant="contained" color="secondary">
                  {row.win}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button sx={{ p: 2 }} variant="contained" color="secondary">
                  {row.draw}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button sx={{ p: 2 }} variant="contained" color="secondary">
                  {row.lose}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
