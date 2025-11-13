import { FiltersProps } from "./types";

export default function StatusFilters({ filters, setFilters }: FiltersProps) {
  return (
    <div className="status-filters">
      <h2>Показать технологии по статусу</h2>
      <div className="row">
        <button onClick={() => setFilters({ ...filters, status: undefined })}>
          Все
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "not-started" })}
        >
          Не начатые
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "in-progress" })}
        >
          В процессе изучения
        </button>
        <button onClick={() => setFilters({ ...filters, status: "completed" })}>
          Изученные
        </button>
        <button onClick={() => setFilters({ ...filters, status: "cancelled" })}>
          Отмененные
        </button>
      </div>
    </div>
  );
}
