import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import PaperBetDialog from "../dialogs/paper.dialog";
import { AppContext } from "../../contexts/AppContext";
import { Game, Event } from "../../types";
import Title from "./title";
import Players from "./players";
import { StyledTableCell, StyledTableRow } from "./styled";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useLayout } from "../../hooks/useLayout";
import dayjs from "dayjs";

export default function Events({
  event,
  slug,
}: {
  event: Event;
  slug?: string;
}) {
  const [openPaperBetDialog, setOpenPaperBetDialog] = useState(false);
  const { addBetToPaper, paper, removeBetFromPaper } = useContext(AppContext);
  const { setOpenLogin } = useLayout();
  const { user } = useAuthUser();

  const toBeFavorite = user?.favorites?.find(
    (sport) => sport.name === event.sport
  );

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
    <>
      <PaperBetDialog
        open={openPaperBetDialog}
        onClose={() => setOpenPaperBetDialog(!openPaperBetDialog)}
      />
      <Box mt={4}>
        <Title
          title={event.sport}
          breadcrumb={slug}
          isFavorite={Boolean(toBeFavorite)}
        />
        <Box mt={2}>
          <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>{event.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    Vencedor da Partida
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event.games.length === 0 && (
                  <>
                    <Typography
                      variant="body1"
                      color="gray"
                      textAlign={"start"}
                      p={5}
                    >
                      Não há jogos.
                    </Typography>
                  </>
                )}
                {event.games &&
                  event.games.map((game, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        <Box display={"flex"} alignItems={"center"} gap={4}>
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{ minWidth: "150px" }}
                          >
                            {dayjs(game.time_close_bet).format(
                              "DD/MM/YYYY hh:mm"
                            )}
                          </Typography>
                          <Box
                            height={100}
                            sx={({ palette }) => ({
                              borderRight: "1px solid",
                              borderRightColor: palette.primary.main,
                            })}
                          ></Box>
                          <Players
                            home={game.home_name}
                            home_image={game.home_image}
                            visitant={game.away_name}
                            visitant_image={game.away_image}
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
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
