import createTheme from "@mui/material/styles/createTheme";

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
      main: "#FF3162",
    },
    warning: {
      main: "#FFD231",
    },
    info: {
      main: "#319BFF",
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
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "10px",
          "& .MuiDayCalendar-weekDayLabel": {
            color: theme.palette.primary.main,
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: theme.palette.primary.main,
          },
          "& .MuiPickersCalendarHeader-switchViewIcon": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiAccordionSummary-root": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "10px",
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          "& .MuiTableCell-head": {
            color: "#000",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontWeight: 700,
          },
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: () => ({
          "& .MuiTableBody-root.striped": {
            "& .MuiTableRow-root": {
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.background.default,
              },
            },
          },
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        outlined: ({ theme }) => ({
          border: 0,
          justifyContent: "center",
          "& .MuiAlert-message": {
            fontWeight: 400,
            color: theme.palette.warning.main,
          },
        }),
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
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "10px",
            ".MuiTypography-root": {
              color: theme.palette.common.black,
            },
          },
          ":hover": {
            borderRadius: "10px",
            backgroundColor: "#a0a0a0",
          },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: 5,
          padding: 15,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "10px",
            color: theme.palette.common.black,
            ".MuiTypography-root": {
              color: theme.palette.common.black,
            },
          },
          ":hover": {
            borderRadius: "10px",
            backgroundColor: "#1b1c1b",
          },
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
              [theme.breakpoints.down("md")]: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              },
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
          color: "#aaaaaa",
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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#aaaaaa",
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
        input: {
          "&.Mui-disabled": {
            textFillColor: "#fff",
            borderRadius: "10px",
            backgroundColor: "#1B1C1B",
          },
        },
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
