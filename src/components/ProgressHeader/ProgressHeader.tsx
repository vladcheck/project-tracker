import ProgressBar from "../ProgressBar/ProgressBar";

export default function ProgressHeader({
  totalCount,
  completedCount,
}: {
  totalCount: number;
  completedCount: number;
}) {
  const percentage = Math.round(
    completedCount > 0 ? (completedCount * 100) / totalCount : 0
  );

  return (
    <div className="progress-header">
      <div className="row">
        <label htmlFor="">Всего технологий:</label>
        <span className="total-tech-count">{totalCount}</span>
      </div>
      <div className="progress-container row">
        <label className="percentage-label" htmlFor="learning-progress">
          Изучено: {percentage}%
        </label>
        <ProgressBar
          aria-busy="false"
          role="progressbar"
          progress={percentage}
        ></ProgressBar>
      </div>
    </div>
  );
}
