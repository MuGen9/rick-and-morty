import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./utils/routes";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Home from "./views/Home";
import Characters from "./views/Characters";
import Episodes from "./views/Episodes";
import Locations from "./views/Locations";
import Watchlist from "./views/Watchlist";
import useLocalStorage from "./hooks/localStorage";

function App() {
  const { themeName } = useLocalStorage();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeName === "dark" ? "#203745" : "#abc7d8",
        color: "white",
        textAlign: "center",
      }}
    >
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path={appRoutes.characters} element={<Characters />} />
        <Route path={appRoutes.episodes} element={<Episodes />} />
        <Route path={appRoutes.locations} element={<Locations />} />
        <Route path={appRoutes.watchlist} element={<Watchlist />} />
      </Routes>
    </Box>
  );
}

export default App;
