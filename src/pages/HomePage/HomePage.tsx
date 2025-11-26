import { Typography } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function HomePage() {
  const [username] = useLocalStorage("username", "Гость");

  return (
    <main className="flex-center">
      <Typography variant="h1" component="h2" color="textPrimary">
        Привет, {username}!
      </Typography>
    </main>
  );
}
