function getGreetingByTimeOfDay(hour: number): string {
  if (hour < 12) {
    return "Доброе утро";
  } else if (hour < 18) {
    return "Добрый день";
  } else {
    return "Добрый вечер";
  }
}

export default function Greeting() {
  const userName = "Вова";

  const currentHour = new Date().getHours();
  const greeting = getGreetingByTimeOfDay(currentHour);

  return (
    <div className="greeting">
      <h1>
        {greeting}, {userName}!
      </h1>
      <p>Рады видеть вас в нашем приложении.</p>
    </div>
  );
}
