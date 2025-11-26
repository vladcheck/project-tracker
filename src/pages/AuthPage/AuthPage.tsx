import { useContext } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Box, Typography } from "@mui/material";
import UserContext from "../../context/UserContext";

export default function AuthPage() {
  const ctx = useContext(UserContext);

  return (
    <main className="flex-center">
      {!ctx.isLoggedIn && (
        <Box className="register-section">
          <Typography variant="h1" component="h2" color="textPrimary">
            Регистрация
          </Typography>
          <RegisterForm />
        </Box>
      )}
      {ctx.isLoggedIn && (
        <Box className="your-account-section">
          <Typography variant="h1" component="h2" color="textPrimary">
            Ваш аккаунт
          </Typography>
        </Box>
      )}
    </main>
  );
}
