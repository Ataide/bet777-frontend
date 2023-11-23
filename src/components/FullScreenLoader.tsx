import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

const FullScreenLoader = () => {
  return (
    <Container sx={{ height: "95vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default FullScreenLoader;
