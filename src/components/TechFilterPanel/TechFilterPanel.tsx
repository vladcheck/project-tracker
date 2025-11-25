import { FiltersProps } from "./types";
import Button from "../Button/Button";
import Row from "../Row/Row";
import "./style.css";

export default function TechFilterPanel({ filters, setFilters }: FiltersProps) {
  return (
    <div id="tech-filter-panel">
      <h2>Фильтры</h2>
      <div className="status-filters">
        <Button
          onClick={() => setFilters({ ...filters, status: undefined })}
          title="Все"
        />
        <Button
          onClick={() => setFilters({ ...filters, status: "not-started" })}
          title="Не начатые"
        />
        <Button
          onClick={() => setFilters({ ...filters, status: "in-progress" })}
          title=" В процессе изучения"
        />
        <Button
          onClick={() => setFilters({ ...filters, status: "completed" })}
          title="Изученные"
        />
        <Button
          onClick={() => setFilters({ ...filters, status: "cancelled" })}
          title="Отмененные"
        />
      </div>
      <div className="filter-inputs">
        <Row>
          <label htmlFor="tech-name">Название</label>
          <input
            type="text"
            id="tech-name"
            value={filters.title ?? ""}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            placeholder="(нет)"
          />
        </Row>
        <Row>
          <label htmlFor="tech-description">Описание</label>
          <input
            type="text"
            id="tech-description"
            value={filters.description ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, description: e.target.value })
            }
            placeholder="(нет)"
          />
        </Row>
      </div>
    </div>
  );
}
