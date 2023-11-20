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
import { useQuery } from "react-query";
import { getEventsFn, getHotEventsFn } from "../../services/EventService";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Box from "@mui/material/Box";
import { Game } from "../../types";
import { useLayout } from "../../hooks/useLayout";
import { useAuthUser } from "../../hooks/useAuthUser";

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

export default function EventsTables() {
  const { isLoading, isError, data, error } = useQuery(
    "hot-events",
    getHotEventsFn
  );
  const { addBetToPaper, paper, removeBetFromPaper } = useContext(AppContext);
  const { setOpenLogin } = useLayout();
  const { user } = useAuthUser();
  const handleIntentBet = (e: any, game: Game) => {
    const bet_choice = e.target.attributes["data-choice"].value;
    const name = e.target.attributes["data-name"].value;
    const rate = e.target.attributes["data-rate"].value;

    if (!user) {
      setOpenLogin(true);
      return;
    }

    const intentAlreadyAdded = paper?.bets.find(
      (e) => e.game_id === game.id && e.bet_choice == bet_choice
    );

    if (intentAlreadyAdded) {
      removeBetFromPaper(intentAlreadyAdded);
      return;
    }

    addBetToPaper({
      game_id: Number(game.id) || 0,
      bet_choice_name: name,
      rate: Number(rate) ?? 0,
      players: `${game.home_name} vs ${game.away_name}`,
      bet_choice: bet_choice,
    });
  };

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
          {data &&
            data.data.map((event) => {
              return (
                <>
                  {event &&
                    event.games.map((game, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          sx={{
                            borderRight: "1px solid #7E7E7E",
                          }}
                          component="th"
                          scope="row"
                        >
                          {dayjs(game.time_close_bet).format("DD/MM/YYYY")}{" "}
                          <br />
                          {dayjs(game.time_close_bet).format("hh:mm")}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderRight: "1px solid #7E7E7E",
                          }}
                          align="left"
                        >
                          {event.title}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            borderRight: "1px solid #7E7E7E",
                          }}
                          align="left"
                        >
                          {game.home_name} vs {game.away_name}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color={
                              paper?.bets.some(
                                (e) =>
                                  e.game_id === game.id && e.bet_choice == 1
                              )
                                ? "primary"
                                : "secondary"
                            }
                            data-choice="1"
                            data-rate={game.home_rate.toFixed(2)}
                            data-name={game.home_name}
                            onClick={(e) => handleIntentBet(e, game)}
                          >
                            1 <br />
                            {game.home_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color={
                              paper?.bets.some(
                                (e) =>
                                  e.game_id === game.id && e.bet_choice == 0
                              )
                                ? "primary"
                                : "secondary"
                            }
                            data-choice="0"
                            data-rate={game.draw_rate.toFixed(2)}
                            data-name={"Empate"}
                            onClick={(e) => handleIntentBet(e, game)}
                          >
                            x <br />
                            {game.draw_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color={
                              paper?.bets.some(
                                (e) =>
                                  e.game_id === game.id && e.bet_choice == -1
                              )
                                ? "primary"
                                : "secondary"
                            }
                            data-choice="-1"
                            data-rate={game.away_rate.toFixed(2)}
                            data-name={game.away_name}
                            onClick={(e) => handleIntentBet(e, game)}
                          >
                            2 <br />
                            {game.away_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell>

                        {/* <StyledTableCell align="center">
                          <Button
                            sx={{ p: 2 }}
                            variant="contained"
                            color="secondary"
                          >
                            {game.home_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            sx={{ p: 2 }}
                            variant="contained"
                            color="secondary"
                          >
                            {game.draw_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            sx={{ p: 2 }}
                            variant="contained"
                            color="secondary"
                          >
                            {game.away_rate.toFixed(2)}
                          </Button>
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
