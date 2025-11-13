import StatusFilters from "./StatusFilters";
import { FiltersProps } from "./types";

export default function TechFilterPanel({ filters, setFilters }: FiltersProps) {
  return (
    <div id="tech-filter-panel">
      <StatusFilters filters={filters} setFilters={setFilters} />
      <div className="row">
        <label htmlFor="tech-name">Название</label>
        <input
          type="text"
          id="tech-name"
          value={filters.title ?? ""}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
      </div>
      <div className="row">
        <label htmlFor="tech-description">Описание</label>
        <input
          type="text"
          id="tech-description"
          value={filters.description ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, description: e.target.value })
          }
        />
      </div>
    </div>
  );
}
