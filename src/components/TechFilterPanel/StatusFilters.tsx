import Button from "../Button/Button";
import { FiltersProps } from "./types";
import "./style.css";

export default function StatusFilters({ filters, setFilters }: FiltersProps) {
  return (
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
  );
}
