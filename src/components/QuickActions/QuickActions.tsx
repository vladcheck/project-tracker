import "./style.css";

export default function QuickActions({
  setAllToCompleted,
  resetAll,
  setRandomTechToInProgress,
  exportTechnologies,
}: {
  setAllToCompleted: () => void;
  resetAll: () => void;
  setRandomTechToInProgress: () => void;
  exportTechnologies: () => void;
}) {
  return (
    <div className="quick-actions-section">
      <h2>Быстрые действия</h2>
      <div className="quick-actions">
        <button onClick={setAllToCompleted}>
          Отметить все как выполненные
        </button>
        <button onClick={resetAll}>Сбросить все статусы</button>
        <button onClick={setRandomTechToInProgress}>
          Случайный выбор следующей технологии
        </button>
        <button onClick={exportTechnologies}>Экспортировать</button>
      </div>
    </div>
  );
}
