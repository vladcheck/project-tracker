import { Status, Tech } from "../../types";
import Icon from "../Icon/Icon";
import "./style.css";

function translateStatus(status: Status): string {
  switch (status) {
    case "completed":
      return "Изучена";
    case "cancelled":
      return "Не будет изучена";
    case "in-progress":
      return "Изучается";
    case "not-started":
      return "Не начата";
  }
}

export default function TechCard({
  id,
  setStatus,
  status,
  title,
  description,
  notes = "",
}: {
  setStatus: (id: string) => void;
} & Tech) {
  return (
    <div aria-label="Технология" className={`tech-card ${status}`}>
      <div className="tech-card-actions">
        <button
          role="button"
          aria-label="Редактировать технологию"
          className="edit-tech-button action"
        >
          <Icon src="/icons/icons8-crayon-48.webp" alt="edit" size={20} />
        </button>
        <button
          role="button"
          aria-label="Удалить технологию"
          className="delete-tech-button action"
        >
          <Icon src="/icons/icons8-cross-50.webp" alt="delete" size={20} />
        </button>
      </div>
      <div
        className="tech-info"
        onClick={() => {
          setStatus(id);
        }}
      >
        <h6 className="title">{title}</h6>
        <p className="description">{description}</p>
        <span className="status">Статус: {translateStatus(status)}</span>
        <br />
        <small aria-label="notes" className="notes">
          <i>{notes}</i>
        </small>
      </div>
    </div>
  );
}
