import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function AuthPage() {
  const [loggedIn] = useState<boolean>(false);

  return (
    <main className="flex-center">
      {!loggedIn && (
        <section className="register-section">
          <h1>Регистрация</h1>
          <RegisterForm />
        </section>
      )}
    </main>
  );
}
