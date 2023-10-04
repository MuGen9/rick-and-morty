import { PaletteMode, createTheme } from "@mui/material";
const themeName = (localStorage.getItem("theme") as PaletteMode) || "dark";

export const theme = createTheme({
  palette: {
    mode: themeName,
    primary: {
      main: "#41b4c9",
    },
    secondary: {
      main: "#bfde42",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: themeName === "dark" ? "white" : "black",
        },
      },
    },
  },
});
