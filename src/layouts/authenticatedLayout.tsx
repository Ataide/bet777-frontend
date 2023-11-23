import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

import logo from "../assets/logo_vertical.png";
import { useLayout } from "../hooks/useLayout";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  FutebolIcon,
  HomeIcon,
  FavoriteIcon,
  VoleiIcon,
  BasqueteIcon,
  TenisIcon,
  FutebolAIcon,
  BoxeIcon,
  BaisebolIcon,
} from "../components/icons/sidebar";
import Container from "@mui/material/Container";
import LoginDialog from "../components/dialogs/login.dialog";
import { useState } from "react";
import RegisterDialog from "../components/dialogs/register.dialog";
import AccountMenu from "../components/accountMenu";
import { useAuthUser } from "../hooks/useAuthUser";
import WalletCard from "../components/cards/wallet";
import TopBets from "../components/cards/topbets";
import PaperCard from "../components/cards/papers";

const Navlink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  "&.active": {
    color: theme.palette.primary.main,
  },
}));

export default function AuthenticatedLayout() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const { openLogin, setOpenLogin } = useLayout();
  const { openRegister, setOpenRegister } = useLayout();
  const { user } = useAuthUser();

  const { drawerWidth, righrDrawerWidth } = useLayout();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const drawer = (
    <>
      <Toolbar
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={logo} width={78} alt="" />
      </Toolbar>
      <Divider />
      <Container>
        <Box mt={4}>
          <TextField
            color="primary"
            placeholder="Buscar evento"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "common.white" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List
          sx={{
            ".MuiListItemButton-root": {
              pl: "10px",
              fontSize: "15px",
            },
            ".MuiListItemIcon-root": {
              minWidth: "18px",
              marginRight: "10px",
            },
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Pagina inicial"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                if (!user) {
                  setOpenLogin(true);
                  return;
                }
                navigate("/favoritos");
              }}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Favoritos"} />
            </ListItemButton>
          </ListItem>
          <Box p={1}>
            <Typography variant="h5" color={"primary"}>
              Esportes
            </Typography>
          </Box>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/1")}>
              <ListItemIcon>
                <FutebolIcon />
              </ListItemIcon>
              <ListItemText primary={"Futebol"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/2")}>
              <ListItemIcon>
                <VoleiIcon />
              </ListItemIcon>
              <ListItemText primary={"Vôlei"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/3")}>
              <ListItemIcon>
                <BasqueteIcon />
              </ListItemIcon>
              <ListItemText primary={"Basquete"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/7")}>
              <ListItemIcon>
                <TenisIcon />
              </ListItemIcon>
              <ListItemText primary={"Tenis"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/6")}>
              <ListItemIcon>
                <FutebolAIcon />
              </ListItemIcon>
              <ListItemText primary={"Futebol Americano"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/5")}>
              <ListItemIcon>
                <BoxeIcon />
              </ListItemIcon>
              <ListItemText primary={"Boxe"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/7")}>
              <ListItemIcon>
                <BaisebolIcon />
              </ListItemIcon>
              <ListItemText primary={"Beisebol"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/esportes/8")}>
              <ListItemText primary={"Outros"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flex={1}
          >
            <Box display={"flex"} gap={3}>
              <Navlink to={"/"} className={pathname === "/" ? "active" : ""}>
                Pagina Inicial
              </Navlink>
              <Navlink
                onClick={(e) => {
                  e.preventDefault();
                  if (!user) {
                    setOpenLogin(true);
                    return;
                  }

                  navigate("/favoritos");
                }}
                to={"/favoritos"}
                className={pathname === "/favoritos" ? "active" : ""}
              >
                Favoritos
              </Navlink>
              <Navlink
                to={"/esportes"}
                className={pathname === "/esportes" ? "active" : ""}
              >
                Esportes
              </Navlink>
            </Box>
            <Box display={"flex"} gap={2}>
              {!user ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenRegister(true)}
                  >
                    <Typography>Cadastro</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenLogin(true)}
                  >
                    <Typography>Login</Typography>
                  </Button>
                </>
              ) : (
                <AccountMenu name={user?.name} />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="nav-links"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open={true}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          marginBottom: "56px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* To fix margin of toolbar */}
        <Toolbar />
        <Outlet />
      </Box>
      {/* <Paper
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
          value={value}
          onChange={(e, newValue) => {
            setTimeout(() => {
              setValue(newValue);
              navigate(newValue);
            }, 200);
          }}
        >
          <BottomNavigationAction value="/" icon={<HomeIcon />} />
          <BottomNavigationAction
            value="/wallet"
            icon={<AccountBalanceWalletIcon />}
          />
          <BottomNavigationAction value="/agenda" icon={<EventNoteIcon />} />
          <BottomNavigationAction
            value="/tarefas"
            icon={<PlaylistAddCheckIcon />}
          />
          <BottomNavigationAction value="/settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper> */}
      <Box
        component="nav"
        sx={{
          zIndex: 1000,
          width: { sm: righrDrawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="nav-links"
      >
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: righrDrawerWidth,
            },
          }}
          open={true}
        >
          <Toolbar />
          <Paper>
            <Box p={2} mt={4} display={"flex"} flexDirection={"column"} gap={4}>
              <WalletCard />
              {/* <TopBets /> */}
              <PaperCard />
            </Box>
          </Paper>
        </Drawer>
      </Box>
      <LoginDialog open={openLogin} onClose={() => setOpenLogin(!openLogin)} />
      <RegisterDialog
        open={openRegister}
        onClose={() => setOpenRegister(!openRegister)}
      />
    </Box>
  );
}
