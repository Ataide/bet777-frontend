import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TabPanelProps } from "../../types";

export default function WalletCard() {
  const [value, setValue] = useState(0);

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
        sx={{ backgroundColor: "background.default", borderRadius: "10px" }}
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
          <InviteLogin />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <InviteLogin />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

function InviteLogin() {
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
      <Button variant="contained" color="primary">
        <Typography>Login</Typography>
      </Button>
      <Typography variant="body1" textAlign={"center"}>
        Caso não possua uma conta
      </Typography>
      <Button variant="contained" color="primary">
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
      {value === index && <Box sx={{ p: 2.5 }}>{children}</Box>}
    </div>
  );
}
