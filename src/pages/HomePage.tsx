import useLocalStorage from "../hooks/useLocalStorage";
import "./HomePage.css";

export default function HomePage() {
  const [username] = useLocalStorage("username", "Гость");

  return (
    <main>
      <h1>Привет, {username}!</h1>
    </main>
  );
}
