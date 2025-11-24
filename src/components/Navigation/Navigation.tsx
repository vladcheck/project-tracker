import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="main-navigation">
      <ul className="nav-menu">
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/statistics">Статистика</NavLink>
        </li>
        <li>
          <NavLink to="/technologies">Все технологии</NavLink>
        </li>
        <li>
          <NavLink to="/add-technology">Добавить технологию</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Настройки</NavLink>
        </li>
      </ul>
    </nav>
  );
}
