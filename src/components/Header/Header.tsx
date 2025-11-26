import { Typography } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Typography
        variant="h1"
        component="h1"
        color="textPrimary"
        sx={{ userSelect: "none" }}
      >
        Roadmapper
        <sup className="trademark">TM</sup>
      </Typography>
      <Navigation />
    </header>
  );
}
