import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { red } from "@mui/material/colors";

const muiTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#000000" },
      error: { main: red[500] },
    },
    typography: {
      h1: { fontSize: "3rem" },
      h2: { fontSize: "1.7rem" },
      h3: { fontSize: "1.5rem" },
      h4: { fontSize: "1.3rem" },
    },
  }),
);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>,
  );
} else {
  throw Error("No root element");
}
