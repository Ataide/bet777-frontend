import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import { TabPanelProps } from "../../types";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TopBetsList from "../list/listTopBets";
import CheckboxList from "../list/CheckboxList";
import { IBetWithOdds } from "../../interfaces";

const topBetOdds: IBetWithOdds[] = [
  {
    id: 1,
    gameType: 1,
    gameTitle: "Palmeiras vs Santos",
    oddTitle: "Vencedor",
    oddPlayer: "Santos",
    odd: 5.5,
  },
  {
    id: 2,
    gameType: 1,
    gameTitle: "Palmeiras vs Santos",
    oddTitle: "Vencedor",
    oddPlayer: "Palmeiras",
    odd: 5.5,
  },
  {
    id: 3,
    gameType: 1,
    gameTitle: "Palmeiras vs Flamengo",
    oddTitle: "Vencedor",
    oddPlayer: "Flamengo",
    odd: 5.5,
  },
];

export default function TopBets() {
  return (
    <>
      <Container component="article" disableGutters className="page">
        <Box
          component={"header"}
          sx={{
            display: "flex",
            height: "53px",
            padding: "0px 10px",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "primary.main",
            borderRadius: "10px 10px 0px 0px",
            color: "primary.contrastText",
            fontSize: "20px",
          }}
        >
          Top bets
        </Box>
        <Box
          component={"main"}
          sx={{ backgroundColor: "background.default", borderRadius: "10px" }}
        >
          <Tabs
            value={0}
            onChange={() => {}}
            aria-label="top bet tab"
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            sx={{
              ".Mui-selected": {
                backgroundColor: "primary.dark",
                borderRadius: "0px 0px 10px 10px",
                color: "#000 !important",
              },
              ".MuiButtonBase-root": {
                maxWidth: "1000px",
              },
            }}
          >
            <Tab
              sx={{ flex: 1, fontWeight: 700, color: "#ffffff" }}
              label="Aposta única"
            />
          </Tabs>
          <CustomTabPanel value={0} index={0}>
            {topBetOdds &&
              topBetOdds.map((bet, index) => (
                <CheckboxList
                  key={index}
                  gameTitle={bet.gameTitle}
                  gameType={bet.gameType}
                  odd={bet.odd}
                  oddPlayer={bet.oddPlayer}
                  oddTitle={bet.oddTitle}
                />
              ))}
          </CustomTabPanel>
        </Box>
        <Box component={"footer"}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              height: "52px",
            }}
          >
            <Typography>Login</Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2.5 }}>{children}</Box>}
    </div>
  );
}
