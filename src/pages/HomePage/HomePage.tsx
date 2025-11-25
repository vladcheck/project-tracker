import useLocalStorage from "../../hooks/useLocalStorage";

export default function HomePage() {
  const [username] = useLocalStorage("username", "Гость");

  return (
    <main>
      <h1>Привет, {username}!</h1>
    </main>
  );
}
