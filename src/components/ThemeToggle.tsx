import { Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { MaterialUISwitch } from "./CustomSwitches";

type ThemeToggleProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeToggle = ({ isDarkMode, toggleDarkMode }: ThemeToggleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 2,
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Brightness7 sx={{ color: isDarkMode ? "#757575" : "#fdd835", mr: 1 }} />
      <MaterialUISwitch checked={isDarkMode} onChange={toggleDarkMode} />
      <Brightness4 sx={{ color: isDarkMode ? "#90caf9" : "#757575", ml: 1 }} />
    </Box>
  );
};

export default ThemeToggle;
