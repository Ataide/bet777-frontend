import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainBanner from "../components/cards/banner";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import WalletCard from "../components/cards/wallet";
import TopBets from "../components/cards/topbets";
import image from "../assets/group1.png";
import EventsTables from "../components/tables/eventsTable";
import Events, { Event } from "../components/events/events";

function Card() {
  return (
    <Paper sx={{ paddingX: 4, paddingY: 2, borderRadius: "10px" }}>
      <Box p={1}>
        <Typography textAlign={"center"} variant="body1">
          Campeonato Brasileiro
        </Typography>
        <Typography variant="subtitle2">18/09/2023</Typography>
        <hr />
        <Box p={1}>
          <img src={image} width={"100%"} alt="" />
        </Box>
        <Box display={"flex"} gap={2}>
          <Button variant="contained" color="secondary" fullWidth>
            <Box p={2}>
              <Typography variant="subtitle1">Flamengo</Typography>
              <Typography variant="subtitle1">5.5</Typography>
            </Box>
          </Button>
          <Button variant="contained" color="secondary" fullWidth>
            <Box p={2}>
              <Typography variant="subtitle1">Flamengo</Typography>
              <Typography variant="subtitle1">5.5</Typography>
            </Box>
          </Button>
          <Button variant="contained" color="secondary" fullWidth>
            <Box p={2}>
              <Typography variant="subtitle1">Flamengo</Typography>
              <Typography variant="subtitle1">5.5</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

const futebolEvent: Event = {
  type: "Futebol",
  tournaments: [
    {
      name: "Brasileirão serie A",
      games: [
        {
          id: 1,
          home: "Flamengo",
          visitor: "Palmeiras",
          start_date: "15/09 11:25",
          home_odd: 5.5,
          x_odd: 1.4,
          visitor_odd: 6.1,
        },
        {
          id: 2,
          home: "Flamengo",
          visitor: "Palmeiras",
          start_date: "20/09 11:25",
          home_odd: 5.5,
          x_odd: 1.4,
          visitor_odd: 6.1,
        },
      ],
    },
  ],
};

const VoleiEvent: Event = {
  type: "Vôlei",
  tournaments: [
    {
      name: "Brasileirão serie A",
      games: [
        {
          id: 1,
          home: "Flamengo",
          visitor: "Palmeiras",
          start_date: "15/09 11:25",
          home_odd: 5.5,
          x_odd: 1.4,
          visitor_odd: 6.1,
        },
        {
          id: 2,
          home: "Flamengo",
          visitor: "Palmeiras",
          start_date: "20/09 11:25",
          home_odd: 5.5,
          x_odd: 1.4,
          visitor_odd: 6.1,
        },
      ],
    },
  ],
};

export default function DashboardPage() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box p={4}>
            <MainBanner />
            <Box>
              <Box py={4}>
                <Typography variant="h4">Principais Eventos</Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Card />
                </Grid>
                <Grid item xs={6}>
                  <Card />
                </Grid>
                <Grid item xs={12} mt={4}>
                  <EventsTables />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Events event={futebolEvent} />
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p={4} display={"flex"} flexDirection={"column"} gap={4}>
              <WalletCard />
              <TopBets />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
