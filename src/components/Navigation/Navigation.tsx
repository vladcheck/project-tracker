import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { List, ListItem, Link as MuiLink } from "@mui/material";

function Entry({ to, label }: { to: string; label: string }) {
  return (
    <ListItem>
      <NavLink to={to} style={{ textDecoration: "none" }}>
        <MuiLink underline="none" sx={{ fontSize: "1.3rem" }}>
          {label}
        </MuiLink>
      </NavLink>
    </ListItem>
  );
}

export default function Navigation() {
  return (
    <List className="main-navigation" component="nav">
      <List className="nav-menu">
        <Entry to="/" label="Главная" />
        <Entry to="/statistics" label="Статистика" />
        <Entry to="/technologies" label="Все технологии" />
        <Entry to="/add-technology" label="Добавить технологию" />
        <Entry to="/settings" label="Настройки" />
      </List>
    </List>
  );
}
