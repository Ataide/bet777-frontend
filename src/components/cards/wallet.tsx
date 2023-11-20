import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IBet, TabPanelProps } from "../../types";
import { useStateContext } from "../../contexts";
import Paper from "@mui/material/Paper";
import { BetType } from "../../enums";
import Divider from "@mui/material/Divider";
import { useQuery, useQueryClient } from "react-query";
import { getOpenPapersFn } from "../../services/BetService";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useLayout } from "../../hooks/useLayout";
import { getWalletFn } from "../../services/WalletService";
import { useNavigate } from "react-router-dom";
import { getPalpitesFromBet } from "../../utils/utils";

export default function WalletCard() {
  const [value, setValue] = useState(0);

  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
        Sua carteira
      </Box>
      <Box
        component={"main"}
        sx={{
          backgroundColor: "background.default",
          borderRadius: "10px",
          minHeight: "270px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            display: "flex",
            ".MuiTab-root": {
              minHeight: "33px",
              padding: 0,
            },

            ".Mui-selected": {
              backgroundColor: "primary.dark",
              borderRadius: "0px 0px 10px 10px",
              color: "#000 !important",
            },
          }}
        >
          <Tab
            sx={{ flex: 1, fontWeight: 700, color: "#ffffff" }}
            label="Saldo"
          />
          <Tab
            sx={{ flex: 1, fontWeight: 700, color: "#ffffff" }}
            label="Suas Bets"
          />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          {user ? <Ballance /> : <InviteLogin />}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {user ? <Bets /> : <InviteLogin />}
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

function Ballance() {
  const { data, isError, isLoading } = useQuery("wallet", getWalletFn);
  const navigate = useNavigate();

  return (
    <Box display={"flex"} flexDirection={"column"} mt={6}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={400} variant="caption" color="initial">
          Saldo Total:
        </Typography>
        <Typography fontWeight={400} variant="caption" color="primary">
          R$ {data?.amount}
        </Typography>
      </Box>
      <Divider />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={400} variant="caption" color="initial">
          Saldo em aposta:
        </Typography>
        <Typography fontWeight={400} variant="caption" color="primary">
          R$ {data?.bet_total}
        </Typography>
      </Box>
      <Divider />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={400} variant="caption" color="initial">
          Saldo livre pra saque:
        </Typography>
        <Typography fontWeight={400} variant="caption" color="primary">
          R$ {data?.draw_total}
        </Typography>
      </Box>
      <Divider />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate("/conta/deposito")}
      >
        Depositar
      </Button>
    </Box>
  );
}

function Bets() {
  const { isLoading, isError, data, error } = useQuery(
    "open-papers",
    getOpenPapersFn,
    {
      refetchOnWindowFocus: true,
    }
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {data &&
        data.map((paper, index) => (
          <Paper sx={{ minHeight: "110px", padding: 0 }} key={index}>
            <Box p={1}>
              <Box display={"flex"} flexDirection={"row"} mb={1}>
                <Typography variant="caption" color="initial">
                  Aposta:
                </Typography>
                <Typography variant="caption" color="primary" ml={1}>
                  {paper.quantity! > 1 ? "Múltipla" : "Única"}
                </Typography>
                <Typography variant="caption" color="initial" ml={2}>
                  Odd:
                </Typography>
                <Typography variant="caption" color="primary" ml={1}>
                  {paper.rate}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"row"} mb={1}>
                <Typography variant="caption" color="initial">
                  Palpite:
                </Typography>
                <Typography variant="caption" color="primary" ml={1}>
                  {getPalpitesFromBet(paper.bets)}
                </Typography>
              </Box>
              <Divider
                variant="fullWidth"
                sx={({ palette }) => ({
                  my: 2,
                  borderColor: palette.primary.main,
                })}
              />
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-paperween"}
              >
                <Box display={"flex"}>
                  <Typography variant="caption" color="initial">
                    Valor:
                  </Typography>
                  <Typography variant="caption" color="primary" ml={1}>
                    R$ {paper.amount}
                  </Typography>
                </Box>
                <Box display={"flex"}>
                  <Typography variant="caption" color="initial">
                    Lucro possível:
                  </Typography>
                  <Typography variant="caption" color="primary" ml={1}>
                    R$ {paper.profit}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
    </Box>
  );
}

export interface IBetsInfo {
  id: number;
  betType?: BetType;
  bet: string;
  odd?: number;
  amount?: number;
}

function InviteLogin() {
  const { user } = useAuthUser();
  const { setOpenLogin, setOpenRegister } = useLayout();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      alignItems={"center"}
      mt={6}
      mb={6}
    >
      <Typography variant="body1" textAlign={"center"}>
        Faça login para visualizar sua carteira
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpenLogin(true);
        }}
      >
        <Typography>Login</Typography>
      </Button>
      <Typography variant="body1" textAlign={"center"}>
        Caso não possua uma conta
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpenRegister(true);
        }}
      >
        <Typography>Cadastro</Typography>
      </Button>
    </Box>
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
      {value === index && <Box sx={{ p: 1.25 }}>{children}</Box>}
    </div>
  );
}
