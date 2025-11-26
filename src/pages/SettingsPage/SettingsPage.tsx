import { useRef } from "react";
import "./SettingsPage.css";
import Row from "../../components/Row/Row";
import useLocalStorage from "../../hooks/useLocalStorage";
import useTechnologies from "../../hooks/useTechnologies";
import translate from "../../utils/i18n";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

export default function SettingsPage() {
  const { setTechnologies } = useTechnologies();
  const [username, setUsername] = useLocalStorage("username", "Гость");
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [notifications, setNotifications] = useLocalStorage(
    "notifications",
    true,
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="flex-center">
      <Paper className="user-settings" component="section">
        <Typography variant="h1" component="h2" color="textPrimary">
          Настройки пользователя
        </Typography>
        <form id="user-settings-form" ref={formRef}>
          <Row>
            <InputLabel>Имя пользователя:</InputLabel>
            <input
              type="text"
              minLength={3}
              maxLength={40}
              pattern="[A-Za-z][\w]*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ваше имя"
            />
          </Row>
          <Row>
            <InputLabel>Тема оформления:</InputLabel>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <MenuItem value="light">Светлая</MenuItem>
              <MenuItem value="dark">Темная</MenuItem>
              <MenuItem value="auto">Авто</MenuItem>
            </Select>
          </Row>
          <Row>
            <InputLabel htmlFor="turn-on-notifications">
              Включить уведомления
            </InputLabel>
            <input
              id="turn-on-notifications"
              name="turnOnNotifications"
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </Row>
          <Row>
            <Button
              variant="outlined"
              onClick={() => {
                const answer = prompt(
                  "Вы точно этого хотите?",
                )?.toLocaleLowerCase();
                if (answer === "yes" || answer === "y" || answer === "да") {
                  setTechnologies([]);
                  alert("localStorage очищен.");
                }
              }}
            >
              Очистить localStorage
            </Button>
          </Row>
          <Row>
            <Button
              variant="outlined"
              type="submit"
              onClick={(e) => {
                if (formRef.current?.checkValidity()) {
                  e.preventDefault();
                  alert("[STUB] Успешно!");
                }
              }}
            >
              Сохранить изменения
            </Button>
          </Row>
        </form>
        <Box className="current-settings">
          <Typography variant="h2" component="h2" color="textPrimary">
            Текущие настройки
          </Typography>
          <Row>
            <span>Имя</span>
            <span>{username}</span>
          </Row>
          <Row>
            <span>Тема</span>
            <span>{translate(theme)}</span>
          </Row>
          <Row>
            <span>Уведомления</span>
            <span>{notifications ? "Включены" : "Выключены"}</span>
          </Row>
        </Box>
      </Paper>
    </main>
  );
}
