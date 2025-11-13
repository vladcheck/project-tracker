import { Tech, TechFilters } from "../../types";
import { getNextStatus } from "../../utils/status";
import { getTechnologiesByValue, sortById } from "../../utils/tech";
import TechCard from "../TechCard/TechCard";
import "./style.css";

function getTechnologiesByFilters(
  technologies: Tech[],
  filters: TechFilters
): Tech[] {
  let results = technologies;
  if (filters.status) {
    const resultsByStatus = getTechnologiesByValue(
      technologies,
      "status",
      filters.status
    );
    results = resultsByStatus;
  }
  if (filters.description && filters.description.length) {
    results = results.filter((t) => t.title.startsWith(filters.description!));
  }
  if (filters.title && filters.title.length) {
    results = results.filter((t) => t.title.startsWith(filters.title!));
  }
  return results;
}

export default function TechList({
  technologies,
  setTechnologies,
  filters,
}: {
  technologies: Tech[];
  setTechnologies: (arg0: Tech[]) => void;
  filters: TechFilters;
}) {
  const filteredTechnologies = getTechnologiesByFilters(technologies, filters);

  return (
    <div className="tech-list">
      <span className="found-count">
        Результаты: {filteredTechnologies.length}
      </span>
      <div className="technologies">
        {filteredTechnologies.map((t) => (
          <TechCard
            setStatus={(id: string) => {
              const tech = technologies.filter((t) => t.id === id)[0];
              tech.status = getNextStatus(tech.status);
              setTechnologies(
                sortById([...technologies.filter((t) => t.id !== id), tech])
              );
            }}
            id={t.id}
            key={t.id}
            title={t.title}
            description={t.description}
            status={t.status}
            notes={t.notes}
          />
        ))}
      </div>
    </div>
  );
}
