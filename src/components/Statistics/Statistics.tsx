import ProgressBar from "../ProgressBar/ProgressBar";

export default function Statistics({
  stats,
}: {
  stats: {
    completedCount: number;
    totalCount: number;
    cancelled: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}) {
  const percentage = Math.round(
    stats.completedCount > 0
      ? (stats.completedCount * 100) / stats.totalCount
      : 0,
  );

  return (
    <div className="statistics">
      <h2>Статистика</h2>
      <div className="row">
        <label htmlFor="total-tech-count">Всего технологий:</label>
        <span id="total-tech-count" className="total-tech-count">
          {stats.totalCount}
        </span>
      </div>
      <div className="progress-container row">
        <label className="percentage-label" htmlFor="learning-progress">
          Изучено: {percentage}%
        </label>
        <ProgressBar
          id="learning-progress"
          aria-busy="false"
          role="progressbar"
          progress={percentage}
        ></ProgressBar>
      </div>
      <div className="row">
        <label htmlFor="not-started-tasks">Не начато:</label>
        <span id="not-started-tasks">{stats.notStarted}</span>
      </div>
      <div className="row">
        <label htmlFor="in-progress-tasks">Изучается:</label>
        <span id="in-progress-tasks">{stats.inProgress}</span>
      </div>
      <div className="row">
        <label htmlFor="completed-tasks">Изучено:</label>
        <span id="completed-tasks">{stats.completed}</span>
      </div>
      <div className="row">
        <label htmlFor="cancelled-tasks">Не будет изучено:</label>
        <span id="cancelled-tasks">{stats.cancelled}</span>
      </div>
    </div>
  );
}
