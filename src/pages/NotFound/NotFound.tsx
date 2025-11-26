import { Typography } from "@mui/material";

export default function NotFound() {
  return (
    <main
      className="flex-center"
      style={{
        width: "100vw",
        maxHeight: "100vh",
      }}
    >
      <Typography variant="h1" component="h2" color="textPrimary">
        Ой! Что-то сломалось :/
      </Typography>
      <a href="/">Вернуться на главную страницу</a>
    </main>
  );
}
