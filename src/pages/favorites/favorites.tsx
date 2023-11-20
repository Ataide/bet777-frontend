import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import { getFavoritesEventsFn } from "../../services/EventService";
import Events from "../../components/events/events";
import Box from "@mui/material/Box";

export default function FavoritesPage() {
  const { isLoading, isError, data, error } = useQuery(
    "events-favorites",
    getFavoritesEventsFn
  );

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
