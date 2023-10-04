import { PaletteMode } from "@mui/material";
import { useState, useEffect } from "react";

const useLocalStorage = () => {
  const [themeName, setThemeName] = useState<PaletteMode>("dark");

  const changeTheme = () => {
    const newTheme: PaletteMode = themeName === "dark" ? "light" : "dark";
    setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
    window.location.reload();
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setThemeName(storedTheme as PaletteMode);
    }
  }, []);

  return {
    themeName,
    changeTheme,
  };
};

export default useLocalStorage;
