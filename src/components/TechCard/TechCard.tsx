import { Status, Tech } from "../../types";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import "./style.css";

const t: Record<Status, string> = {
  completed: "Изучена",
  cancelled: "Не будет изучена",
  "in-progress": "Изучается",
  "not-started": "Не начата",
};

function translateStatus(status: Status): string {
  return t[status] ?? status;
}

export default function TechCard({
  data,
  setStatus,
}: {
  data: Tech;
  setStatus: (id: string) => void;
}) {
  return (
    <div aria-label="Технология" className={`tech-card ${data.status}`}>
      <div className="tech-card-actions">
        <Button
          role="button"
          aria-label="Редактировать технологию"
          className="edit-tech-button action"
          title="Редактировать технологию"
          icon={
            <Icon src="/icons/icons8-crayon-48.webp" alt="edit" size={20} />
          }
        />
        <Button
          role="button"
          aria-label="Удалить технологию"
          className="delete-tech-button action"
          title="Удалить технологию"
          icon={
            <Icon src="/icons/icons8-cross-50.webp" alt="delete" size={20} />
          }
        />
      </div>
      <div
        className="tech-info"
        onClick={() => {
          setStatus(data.id);
        }}
      >
        <h6 className="title">{data.title}</h6>
        <p className="description">{data.description}</p>
        <span className="status">Статус: {translateStatus(data.status)}</span>
        {data.dueDate && (
          <span className="due-date">Дедлайн: {data.dueDate}</span>
        )}
        <br />
        {data.notes ? (
          <small aria-label="notes" className="notes">
            <i>{data.notes}</i>
          </small>
        ) : null}
      </div>
    </div>
  );
}
