import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import "./style.css";

interface QuickActionsProps {
  setAllToCompleted: () => void;
  resetAll: () => void;
  setRandomTechToInProgress: () => void;
  exportTechnologies: () => void;
  importTechnologies: (e: any) => void;
}

export default function QuickActions({
  setAllToCompleted,
  resetAll,
  setRandomTechToInProgress,
  exportTechnologies,
  importTechnologies,
}: QuickActionsProps) {
  return (
    <div className="quick-actions-section">
      <h2>Быстрые действия</h2>
      <div className="quick-actions">
        <Button
          title="Отметить все как выполненные"
          onClick={setAllToCompleted}
          icon={
            <Icon
              src="/icons/icons8-done-48.png"
              alt="set all technologies as completed"
            />
          }
        />
        <Button
          onClick={resetAll}
          icon={
            <Icon src="/icons/icons8-reset-64.png" alt="reset all statuses" />
          }
          title="Сбросить все статусы"
        />
        <Button
          onClick={setRandomTechToInProgress}
          icon={
            <Icon
              src="/icons/icons8-dice-80.png"
              alt="set random technology's status as 'in-progress'"
            />
          }
          title="Случайный выбор следующей технологии"
        />
        <Button
          onClick={exportTechnologies}
          icon={
            <Icon
              src="/icons/icons8-json-download-64.png"
              alt="download as json"
            />
          }
          title="Экспортировать в JSON"
        />
        <Button
          onClick={(e) => {
            importTechnologies(e);
          }}
          title="Импортировать JSON"
        />
      </div>
    </div>
  );
}
