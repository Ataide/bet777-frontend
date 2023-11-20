import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getEventsFn } from "../../services/EventService";
import Events from "../../components/events/events";
import { useQuery } from "react-query";

export default function SportsPage() {
  const { isLoading, isError, data, error } = useQuery("events", getEventsFn);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box p={4}>
            {data &&
              data.data.map((evento, index) => (
                <Events key={index} event={evento} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
