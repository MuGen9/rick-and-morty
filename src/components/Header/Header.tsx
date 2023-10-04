import { Box, CardMedia, Button, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../utils/routes";
import "./Header.css";
import useLocalStorage from "../../hooks/localStorage";
import { capitalizeFirstLetter } from "../../utils/shared";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = () => {
  const { themeName, changeTheme } = useLocalStorage();

  return (
    <Box component="header" sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          p: { xs: 0.8, md: 3 },
          right: 0,
          color: themeName === "dark" ? "white" : "black",
        }}
      >
        <Typography>{capitalizeFirstLetter(themeName)} Mode</Typography>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => changeTheme()}
          color="inherit"
        >
          {themeName === "dark" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>
      <Box sx={{ maxWidth: "25rem", margin: "0 auto" }}>
        <NavLink to={appRoutes.home} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            src="/logo.png"
            alt="Rick and Morty logo"
            sx={{ maxWidth: "25rem", margin: "0 auto", p: { xs: 1, sm: 0 } }}
          />
        </NavLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: "-30px",
        }}
        component="nav"
      >
        <NavLink to={appRoutes.home} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontSize: "1.2rem", m: 2, p: 2 }}
            className="nav-button"
          >
            Home
          </Button>
        </NavLink>
        <NavLink to={appRoutes.characters} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontSize: "1.2rem", m: 2, p: 2 }}
            className="nav-button"
          >
            Characters
          </Button>
        </NavLink>
        <NavLink to={appRoutes.episodes} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontSize: "1.2rem", m: 2, p: 2 }}
            className="nav-button"
          >
            Episodes
          </Button>
        </NavLink>
        <NavLink to={appRoutes.locations} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontSize: "1.2rem", m: 2, p: 2 }}
            className="nav-button"
          >
            Locations
          </Button>
        </NavLink>
        <NavLink to={appRoutes.watchlist} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontSize: "1.2rem", m: 2, p: 2 }}
            className="nav-button"
          >
            Watchlist
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

export default Header;
