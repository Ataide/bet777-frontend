// import { Outlet } from "react-router-dom";

// import CssBaseline from "@mui/material/CssBaseline";
// import ThemeProvider from "@mui/material/styles/ThemeProvider";

// export default function GuestLayout() {
//   return (
//     <>
//       <CssBaseline />
//       <Outlet />
//     </>
//   );
// }
import clsx from "clsx";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";
import { useAuthUser } from "../hooks/useAuthUser";
import Button from "@mui/material/Button";
import AccountMenu from "../components/accountMenu";

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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo_vertical.png";
import LoginDialog from "../components/dialogs/login.dialog";
import RegisterDialog from "../components/dialogs/register.dialog";
import Paper from "@mui/material/Paper";
import WalletCard from "../components/cards/wallet";
import PaperCard from "../components/cards/papers";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 299;

const righrDrawerWidth = 374;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      flexShrink: 0,
    },
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: -drawerWidth,
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Navlink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  "&.active": {
    color: theme.palette.primary.main,
  },
}));

export default function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSideRight, setOpenSideRight] = React.useState(false);

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const { openLogin, setOpenLogin } = useLayout();
  const { openRegister, setOpenRegister } = useLayout();
  const { user } = useAuthUser();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleSmallScreenDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    setOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Hidden smUp implementation="css">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={
                isSmallScreen ? handleSmallScreenDrawerToggle : handleDrawerOpen
              }
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <Menu sx={{ position: "absolute", left: 20 }} />
            </IconButton>

            <Box display={"flex"} flex={1} justifyContent={"center"}>
              <img src={logo} width={78} alt="" />
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
          </Toolbar>
        </Hidden>

        <Hidden mdDown implementation="css">
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
        </Hidden>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={isMobileOpen}
            onClose={handleSmallScreenDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="persistent"
            open={open}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
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
        <Box position={"fixed"} bottom={30} right={30}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpenSideRight(!openSideRight)}
          >
            <MenuIcon />
          </Fab>
        </Box>
      </Box>

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
          variant={isSmallScreen ? "temporary" : "persistent"}
          anchor="right"
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: righrDrawerWidth,
            },
          }}
          onClose={() => setOpenSideRight(!openSideRight)}
          open={isSmallScreen ? openSideRight : true}
        >
          <div className={classes.drawerHeader}>
            <IconButton color="primary" onClick={() => setOpenSideRight(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Hidden mdDown>
            <Toolbar />
          </Hidden>
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
    </div>
  );
}
