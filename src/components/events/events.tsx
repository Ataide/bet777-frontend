import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FlamengoIcon } from "../../components/icons/times";
import palmeiras from "../../assets/Palmeiras .png";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { StarIcon, StarOutLineIcon } from "../../components/icons/general";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    fontWeight: 700,
    border: 0,
    paddingTop: 9,
    paddingBottom: 9,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 140,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: string, protein: number) {
  return { name, protein };
}

function Title({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  const [isSelected, setSelected] = useState(false);
  return (
    <Box px={4}>
      <Box>
        <Box display={"flex"}>
          <Typography variant="h3">{title}</Typography>
          <IconButton
            onClick={() => {
              setSelected(!isSelected);
            }}
          >
            {isSelected ? <StarIcon /> : <StarOutLineIcon />}
          </IconButton>
        </Box>
        {breadcrumb && (
          <Box display={"flex"} gap={1}>
            <Typography fontWeight={400} variant="body2">
              Página Inicial
            </Typography>{" "}
            {" > "}
            <Typography fontWeight={400} variant="body2" color="primary">
              {breadcrumb}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function Players({ home, visitant }: { home: string; visitant: string }) {
  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <FlamengoIcon />
      <Typography variant="body2" color="primary">
        {home}
      </Typography>
      {"vs"}
      <Typography variant="body2" color="primary">
        {visitant}
      </Typography>
      <img src={palmeiras} width={40} height={40} alt="" />
    </Box>
  );
}

export interface Event {
  type: string;
  tournaments: Tournament[];
}

export interface Tournament {
  name: string;
  shield?: string;
  games: Game[];
}

export interface Game {
  id: number;
  home: string;
  visitor: string;
  home_icon?: string;
  visitor_icon?: string;
  start_date: string;
  visitor_score?: number;
  home_score?: number;
  home_odd: number;
  visitor_odd: number;
  x_odd: number;
}

export default function Events({
  event,
  slug,
}: {
  event: Event;
  slug?: string;
}) {
  return (
    <>
      <Box mt={4}>
        <Title title={event.type} breadcrumb={slug} />

        {event.tournaments &&
          event.tournaments.map((tour) => (
            <Box mt={2}>
              <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{tour.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        Vencedor da Partida
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tour.games.map((game, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            <Box display={"flex"} alignItems={"center"} gap={4}>
                              <Typography variant="body2" color="primary">
                                {game.start_date}
                              </Typography>
                              <Box
                                height={100}
                                sx={({ palette }) => ({
                                  borderRight: "1px solid",
                                  borderRightColor: palette.primary.main,
                                })}
                              ></Box>
                              <Players
                                home={game.home}
                                visitant={game.visitor}
                              />
                            </Box>
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              gap={4}
                              sx={{
                                "& .MuiButton-root": { minWidth: "140px" },
                              }}
                            >
                              <Button variant="contained" color="secondary">
                                1 <br />
                                {game.home_odd}
                              </Button>
                              <Button variant="contained" color="secondary">
                                x <br />
                                {game.x_odd}
                              </Button>
                              <Button variant="contained" color="secondary">
                                2 <br />
                                {game.visitor_odd}
                              </Button>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
      </Box>
    </>
  );
}
