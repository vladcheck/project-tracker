import "./ProgressBar.css";

interface ProgressBarProps {
  id?: string;
  role?: string;
  progress: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

// Универсальный компонент прогресс-бара
export default function ProgressBar({
  progress, // Текущее значение прогресса (от 0 до 100)
  label = "", // Подпись к прогресс-бару
  color = "#4CAF50", // Цвет заполнения
  showPercentage = true, // Показывать ли процент
  animated = false, // Анимировать ли заполнение
}: ProgressBarProps) {
  // Обеспечиваем, чтобы прогресс был в пределах 0-100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-container">
      {/* Заголовок с лейблом и процентом */}
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}

      {/* Внешняя оболочка прогресс-бара */}
      <div className="progress-bar-outer">
        {/* Заполняемая часть прогресс-бара */}
        <div
          className={`progress-bar-inner ${animated ? "animated" : ""}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            transition: animated ? "width 0.5s ease-in-out" : "none",
          }}
        />
      </div>
    </div>
  );
}
