import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Typography, Grid } from "@mui/material";
import image from "../../assets/group1.png";
import GaugeChart from "react-gauge-chart";
import { useQuery } from "react-query";
import { getHotEventsFn } from "../../services/EventService";
import { useLayout } from "../../hooks/useLayout";
import { useAuthUser } from "../../hooks/useAuthUser";
import { Game } from "../../types";
import { AppContext } from "../../contexts/AppContext";
import Slider from "react-slick";
import dayjs from "dayjs";
import { DOMAIN_URL } from "../../api/authApi";

export function HotEvents() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

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
    <Slider {...settings}>
      {data?.data.map((event) => {
        console.log(event);
        return event.games.map((game, index) => (
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
                  {event.title}
                </Typography>
                <Typography variant="subtitle2" color={"grey"}>
                  {dayjs(event.end_date).format("DD/MM/YYYY hh:mm")}
                </Typography>
                <hr />
                <Box p={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <img
                        style={{ margin: "10px auto" }}
                        src={DOMAIN_URL + game.home_image}
                        width={40}
                        alt=""
                      />
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
                      <img
                        style={{ margin: "10px auto" }}
                        src={DOMAIN_URL + game.away_image}
                        width={40}
                        alt=""
                      />
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
        ));
      })}
    </Slider>
  );
}
