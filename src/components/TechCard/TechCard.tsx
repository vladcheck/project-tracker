import useTechnologies from "../../hooks/useTechnologies";
import { Tech } from "../../types";
import translate from "../../utils/i18n";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import TechNotes from "../TechNotes/TechNotes";
import "./style.css";

export default function TechCard({
  data,
  onNotesChange,
  setStatus,
}: {
  data: Tech;
  onNotesChange: (...args: any[]) => void;
  setStatus: (id: string) => void;
}) {
  const { removeTechnology } = useTechnologies();

  return (
    <div aria-label="Технология" className={`tech-card ${data.status}`}>
      <div className="tech-card-actions">
        <Button
          onClick={() => {
            removeTechnology(data.id);
          }}
          role="button"
          aria-label="Удалить технологию"
          className="delete-tech-button action"
          name="Удалить технологию"
          icon={
            <Icon src="/icons/icons8-cross-50.webp" alt="delete" size={20} />
          }
        />
      </div>
      <div className="tech-info">
        <h6 className="name">{data.name}</h6>
        <p className="description">{data.description}</p>
        <div className="meta-info">
          <div className="status">
            <label>Статус:</label> {translate(data.status)}
          </div>
          {data.deadline && (
            <div className="deadline">
              <label>Дедлайн:</label> {data.deadline.toString()}
            </div>
          )}
          <div className="difficulty">
            <label>Сложность:</label> {translate(data.difficulty)}
          </div>
          <div className="category">Категория: {translate(data.category)}</div>
          <div className="resources">
            <label>Ресурсы:</label>
            {data.resources.length > 0 ? (
              data.resources.map((resource) => (
                <a href={resource} target="__blank">
                  {resource}
                </a>
              ))
            ) : (
              <i>нет</i>
            )}
          </div>
        </div>
        <TechNotes
          techId={data.id}
          onNotesChange={onNotesChange}
          notes={data.notes}
        />
        <button
          className="switch-status button"
          onClick={() => {
            setStatus(data.id);
          }}
        >
          Переключить статус
        </button>
      </div>
    </div>
  );
}
