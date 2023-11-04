import { createTheme } from "@mui/material";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#7AFF59",
      contrastText: "#1B1C1B",
    },
    secondary: {
      main: "#1B1C1B",
    },
    error: {
      main: "#F32A5E",
    },
    background: {
      default: "#1B1C1B",
      paper: "#2e2e2e",
    },
    common: {
      black: "#2E2E2E",
    },
    // text: {
    //   primary: "#55433B",
    // },
    text: {
      primary: "#FFFFFF",
    },
    // action: {
    //   active: "rgba(0, 0, 0, 0.54)",
    //   hover: "#FFF6F1",
    //   hoverOpacity: 0.08,
    //   selected: "rgba(0, 0, 0, 0.14)",
    //   disabled: "rgba(0, 0, 0, 0.26)",
    //   disabledBackground: "rgba(0, 0, 0, 0.12)",
    // },
  },
  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
    fontWeightRegular: "700",
    h4: {
      color: "#fff",
    },
  },

  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          minWidth: "35px",
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderLeft: `9px solid ${theme.palette.primary.main}`,
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#7AFF59",
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          minHeight: "36.6px",
          textTransform: "none",
          borderRadius: "10px",
          "& .MuiButton-endIcon": {
            position: "relative",
            right: "0",
          },
          "& .MuiTypography-root": {
            flexGrow: 1,
            fontSize: "12px",
            fontWeight: "700",
          },
          ...(ownerState.color === "secondary" && {
            ":hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }),
        }),
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fontSize: "32px",
          },
          // "& .MuiBottomNavigationAction-root": {
          //   padding: 0,
          // },
          "& .MuiBottomNavigationAction-label.Mui-selected": {
            display: "none",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "90px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root": {
            textTransform: "none",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          padding: 4,
          "&.MuiInputLabel-root": {
            color: "white",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "55px",
          fontSize: "13px",
          "& input::placeholder": {
            fontSize: "13px",
          },
          borderRadius: "10px !important",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 6,
          marginBottom: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            backgroundColor: "#1B1C1B",
            color: "#fff",
            borderRadius: "10px !important",
            ".MuiOutlinedInput-notchedOutline": {
              border: "2px solid #7AFF59",
            },
          }),
        }),
      },
    },
  },
});

export default theme;
