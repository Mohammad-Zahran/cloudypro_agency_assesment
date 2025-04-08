// src/App.tsx
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AlbumIcon from "@mui/icons-material/Album";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsView from "./pages/DetailsView";
import PlayerView from "./pages/PlayerView";
import { darkTheme, lightTheme } from "./styles/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import logo from "./assets/images/spotofy-light.png";

// Define navigation for the dashboard
const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "albums",
    title: "Albums",
    icon: <AlbumIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return savedMode === "true";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src={logo} alt="Logo" />,
          title: "Spotify Dashboard",
          homeUrl: "/",
        }}
        theme={demoTheme}
      >
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/albums/:id" element={<DetailsView />} />
            <Route path="/player" element={<PlayerView />} />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
