import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getEventBySportFn, getEventsFn } from "../../services/EventService";
import Events from "../../components/events/events";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function SportPage() {
  const { sportId } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["event-sport", sportId],
    () => getEventBySportFn(sportId)
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box p={4}>
            {data &&
              data.map((evento, index) => (
                <Events key={index} event={evento} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
