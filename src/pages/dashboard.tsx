import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import MainBanner from "../components/cards/banner";
import { HotEvents } from "../components/carrousel/hotEvents";
import HotEventsMobile from "../components/carrousel/stepperCarousel";
import Events from "../components/events/events";
import EventsTables from "../components/tables/eventsTable";
import { getEventsFn } from "../services/EventService";

export default function DashboardPage() {
  const { isLoading, isError, data, error } = useQuery("events", getEventsFn);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box p={{ xs: 2, md: 4 }}>
            <MainBanner />

            <Box py={4}>
              <Typography variant="h5">Principais Eventos</Typography>
            </Box>

            <Hidden smDown>
              <Grid container spacing={1}>
                <Grid item xs={12} mt={4}>
                  <HotEvents />
                </Grid>

                <Grid item xs={12} mt={4}>
                  <EventsTables />
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <Grid item xs={12} maxWidth={"sm"}>
                <HotEventsMobile />
              </Grid>
            </Hidden>

            <Grid item xs={12}>
              {data &&
                data.data.map((evento, index) => (
                  <Events key={index} event={evento} />
                ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
