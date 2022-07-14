import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
  },
};

// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
