import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import * as React from "react";
import { useContext } from "react";
import GaugeChart from "react-gauge-chart";
import { useQuery } from "react-query";
import { DOMAIN_URL } from "../../api/authApi";
import { AppContext } from "../../contexts/AppContext";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useLayout } from "../../hooks/useLayout";
import { getHotEventsFn } from "../../services/EventService";
import { Game } from "../../types";
import Divider from "@mui/material/Divider";

export default function HotEventsMobile() {
  const { isLoading, isError, data, error } = useQuery(
    "hot-events",
    getHotEventsFn
  );
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data?.data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

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
  const allgames: any[] = [];
  data?.data.map((event) => {
    event.games.map((game, index) => {
      allgames.push({ ...game, title: event.title, end_date: event.end_date });
    });
  });

  return (
    <>
      {allgames.map((game, index) => (
        <Box p={1} display={activeStep === index ? "flex" : "none"}>
          <Box p={1}>
            <Paper
              sx={{
                paddingX: 1,
                paddingY: 1,
                borderRadius: "10px",
              }}
            >
              <Box p={1}>
                <Typography textAlign={"center"} variant="body1">
                  {game.title}
                </Typography>
                <Typography variant="subtitle2" color={"grey"}>
                  {dayjs(game.end_date).format("DD/MM/YYYY hh:mm")}
                </Typography>
                <hr />
                <Box p={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box display={"flex"}>
                        <img
                          style={{ margin: "10px auto" }}
                          src={DOMAIN_URL + game.home_image}
                          width={40}
                          alt=""
                        />
                      </Box>
                      <GaugeChart
                        animate={false}
                        nrOfLevels={20}
                        percent={
                          ((game.home_rate * 100) /
                            (+game.home_rate +
                              +game.draw_rate +
                              +game.away_rate) /
                            100 +
                            -1) *
                          -1
                        }
                        colors={["#FF0000", "#00FF00"]}
                        needleColor="#7AFF59AA"
                      />

                      <Button
                        sx={{ minHeight: "26%" }}
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
                        {game.home_name}
                        <br />
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
                      >
                        VS
                      </Box>
                      <GaugeChart
                        animate={false}
                        colors={["#FF0000", "#00FF00"]}
                        nrOfLevels={20}
                        needleColor="#7AFF59AA"
                        percent={
                          ((game.draw_rate * 100) /
                            (+game.home_rate +
                              +game.draw_rate +
                              +game.away_rate) /
                            100 +
                            -1) *
                          -1
                        }
                      />

                      <Button
                        variant="contained"
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
                        Empate
                        <br />
                        {game.draw_rate.toFixed(2)}
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Box display={"flex"}>
                        <img
                          style={{ margin: "10px auto" }}
                          src={DOMAIN_URL + game.away_image}
                          width={40}
                          alt=""
                        />
                      </Box>
                      <GaugeChart
                        animate={false}
                        colors={["#FF0000", "#00FF00"]}
                        nrOfLevels={20}
                        needleColor="#7AFF59AA"
                        percent={
                          ((game.away_rate * 100) /
                            (+game.home_rate +
                              +game.draw_rate +
                              +game.away_rate) /
                            100 +
                            -1) *
                          -1
                        }
                      />

                      <Button
                        variant="contained"
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
                        {game.away_name} <br />
                        {game.away_rate.toFixed(2)}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Box>
          {/* <Paper
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
                  justifyContent={"end"}
                  flexDirection={"column"}
                  gap={1}
                >
                  <img src={DOMAIN_URL + game.home_image} width={40} alt="" />
                  <GaugeChart
                    animate={false}
                    nrOfLevels={20}
                    percent={
                      ((game.home_rate * 100) /
                        (+game.home_rate + +game.draw_rate + +game.away_rate) /
                        100 +
                        -1) *
                      -1
                    }
                    colors={["#FF0000", "#00FF00"]}
                    needleColor="#7AFF59AA"
                  />
                  <Typography
                    variant="caption"
                    textAlign={"center"}
                    fontWeight={400}
                  >
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
                <GaugeChart
                  animate={false}
                  colors={["#FF0000", "#00FF00"]}
                  nrOfLevels={20}
                  needleColor="#7AFF59AA"
                  percent={
                    ((game.draw_rate * 100) /
                      (+game.home_rate + +game.draw_rate + +game.away_rate) /
                      100 +
                      -1) *
                    -1
                  }
                />
                <Box
                  height={"40px"}
                  margin={"10px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
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
                  justifyContent={"end"}
                  flexDirection={"column"}
                  gap={1}
                  my={2}
                >
                  <img src={DOMAIN_URL + game.away_image} width={40} alt="" />
                  <GaugeChart
                    animate={false}
                    colors={["#FF0000", "#00FF00"]}
                    nrOfLevels={20}
                    needleColor="#7AFF59AA"
                    percent={
                      ((game.away_rate * 100) /
                        (+game.home_rate + +game.draw_rate + +game.away_rate) /
                        100 +
                        -1) *
                      -1
                    }
                  />

                  <Typography
                    variant="caption"
                    textAlign={"center"}
                    fontWeight={400}
                  >
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
          </Paper> */}
        </Box>
      ))}

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </>
  );
}
