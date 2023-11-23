import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IGameWithEvent } from "../../types";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { DOMAIN_URL } from "../../api/authApi";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useLayout } from "../../hooks/useLayout";
import { useAuthUser } from "../../hooks/useAuthUser";
import Divider from "@mui/material/Divider";

interface IGameProps {
  game: IGameWithEvent;
}
export default function GameComponent({ game }: IGameProps) {
  const { addBetToPaper, paper, removeBetFromPaper } = useContext(AppContext);
  const { setOpenLogin } = useLayout();
  const { user } = useAuthUser();

  const handleIntentBet = (e: any, game: IGameWithEvent) => {
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
    <Paper
      sx={{
        paddingX: 1,
        paddingY: 1,
        borderRadius: "10px",
        mt: 3,
      }}
    >
      <Typography textAlign={"center"} variant="body1">
        {game.title}
      </Typography>
      <Typography variant="subtitle2" color={"grey"}>
        {dayjs(game.end_date).format("DD/MM/YYYY hh:mm")}
      </Typography>
      <Divider color={"grey"} />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box
            height={"40px"}
            margin={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={1}
            my={2}
          >
            <img src={DOMAIN_URL + game.home_image} width={40} alt="" />
            <Typography variant="caption" textAlign={"center"} fontWeight={400}>
              {game.home_name}
            </Typography>
          </Box>

          <Button
            sx={{
              minHeight: "70px",
              fontSize: "18px",
            }}
            variant="contained"
            fullWidth={true}
            color={
              paper?.bets.some(
                (e) => e.game_id === game.id && e.bet_choice == 1
              )
                ? "primary"
                : "secondary"
            }
            data-choice="1"
            data-rate={game.home_rate.toFixed(2)}
            data-name={game.home_name}
            onClick={(e) => handleIntentBet(e, game)}
          >
            {game.home_rate.toFixed(2)}
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Box
            height={"40px"}
            margin={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={1}
            my={2}
          >
            VS
          </Box>

          <Button
            variant="contained"
            sx={{ minHeight: "70px", fontSize: "18px" }}
            fullWidth
            color={
              paper?.bets.some(
                (e) => e.game_id === game.id && e.bet_choice == 0
              )
                ? "primary"
                : "secondary"
            }
            data-choice="0"
            data-rate={game.draw_rate.toFixed(2)}
            data-name={"Empate"}
            onClick={(e) => handleIntentBet(e, game)}
          >
            {game.draw_rate.toFixed(2)}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Box
            height={"40px"}
            margin={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={1}
            my={2}
          >
            <img src={DOMAIN_URL + game.away_image} width={40} alt="" />
            <Typography variant="caption" textAlign={"center"} fontWeight={400}>
              {game.away_name}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ minHeight: "70px", fontSize: "18px" }}
            fullWidth
            color={
              paper?.bets.some(
                (e) => e.game_id === game.id && e.bet_choice == -1
              )
                ? "primary"
                : "secondary"
            }
            data-choice="-1"
            data-rate={game.away_rate.toFixed(2)}
            data-name={game.away_name}
            onClick={(e) => handleIntentBet(e, game)}
          >
            {game.away_rate.toFixed(2)}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
