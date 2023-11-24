import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthenticatedLayout() {
  const [selectedNavigator, setSelectedNavigator] = useState<boolean>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Grid container>
        <Hidden smDown>
          <Grid item xs={3}>
            <Box p={4}>
              <Paper>
                <MenuList sx={{ p: 2 }}>
                  <MenuItem
                    selected={pathname.includes("/conta/profile")}
                    onClick={() => navigate("/conta/profile")}
                  >
                    Conta
                  </MenuItem>
                  <MenuItem
                    selected={pathname.includes("/conta/bets")}
                    onClick={() => navigate("/conta/bets")}
                  >
                    Minhas bets
                  </MenuItem>
                  <MenuItem
                    selected={pathname.includes("/conta/deposito")}
                    onClick={() => navigate("/conta/deposito")}
                  >
                    Depósitos
                  </MenuItem>
                  <MenuItem
                    selected={pathname.includes("/conta/saque")}
                    onClick={() => navigate("/conta/saque")}
                  >
                    Saques
                  </MenuItem>
                  <MenuItem
                    selected={pathname.includes("/conta/transacoes")}
                    onClick={() => navigate("/conta/transacoes")}
                  >
                    Transações
                  </MenuItem>
                  <MenuItem>Pix</MenuItem>
                </MenuList>
              </Paper>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { sm: "none" },
          zIndex: 100,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels={false}
          value={selectedNavigator}
          onChange={(e, newValue) => {
            setTimeout(() => {
              setSelectedNavigator(newValue);
              navigate(newValue);
            }, 500);
          }}
        >
          <BottomNavigationAction
            value="/conta/profile"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction value="/conta/bets" icon={<ListAltIcon />} />
          <BottomNavigationAction
            value="/conta/deposito"
            icon={<AccountBalanceIcon />}
          />
          <BottomNavigationAction
            value="/conta/saque"
            icon={<CurrencyExchangeIcon />}
          />
          <BottomNavigationAction
            value="/conta/transacoes"
            icon={<ReceiptLongIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
