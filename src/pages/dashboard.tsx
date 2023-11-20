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
import Events from "../components/events/events";
import { useQuery } from "react-query";
import { getEventsFn } from "../services/EventService";
import { HotEvents } from "../components/carrousel/hotEvents";
import SimpleSlider from "../components/Slider";

export default function DashboardPage() {
  const { isLoading, isError, data, error } = useQuery("events", getEventsFn);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box p={4}>
            <MainBanner />
            <Box>
              <Box py={4}>
                <Typography variant="h4">Principais Eventos</Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={12} mt={4}>
                  <HotEvents />
                </Grid>

                <Grid item xs={12} mt={4}>
                  <EventsTables />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {data &&
                  data.data.map((evento, index) => (
                    <Events key={index} event={evento} />
                  ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
