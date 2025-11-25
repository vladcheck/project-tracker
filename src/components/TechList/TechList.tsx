import useTechnologies from "../../hooks/useTechnologies";
import { Tech, TechFilters } from "../../types";
import { getNextStatus } from "../../utils/status";
import { getTechnologiesByValue, sortById } from "../../utils/tech";
import TechCard from "../TechCard/TechCard";
import "./style.css";

function getTechnologiesByFilters(
  technologies: Tech[],
  filters: TechFilters,
): Tech[] {
  let results = technologies;

  if (filters.status) {
    results = getTechnologiesByValue(technologies, "status", filters.status);
  }
  if (filters.description && filters.description.length) {
    results = results.filter((t) => t.name.startsWith(filters.description!));
  }
  if (filters.name && filters.name.length) {
    results = results.filter((t) => t.name.startsWith(filters.name!));
  }
  return results;
}

export default function TechList({ filters }: { filters: TechFilters }) {
  const { technologies, setTechnologies } = useTechnologies();
  const filteredTechnologies = getTechnologiesByFilters(technologies, filters);

  const onNotesChange = (techId: string, newNote: string) => {
    setTechnologies(
      technologies.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNote } : tech,
      ),
    );
  };

  return (
    <div className="tech-list">
      <span className="found-count">
        Результаты: {filteredTechnologies.length}
      </span>
      <div className="technologies">
        {filteredTechnologies.length > 0 ? (
          filteredTechnologies.map((t) => (
            <TechCard
              key={t.id}
              onNotesChange={onNotesChange}
              setStatus={(id: string) => {
                const tech = technologies.filter((t) => t.id === id)[0];
                tech.status = getNextStatus(tech.status);
                setTechnologies(
                  sortById([...technologies.filter((t) => t.id !== id), tech]),
                );
              }}
              data={t}
            />
          ))
        ) : (
          <span>По данным фильтрам ничего не нашлось :(</span>
        )}
      </div>
    </div>
  );
}
