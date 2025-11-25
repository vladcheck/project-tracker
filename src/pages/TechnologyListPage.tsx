import { useEffect } from "react";
import QuickActions from "../components/QuickActions/QuickActions";
import TechFilterPanel from "../components/TechFilterPanel/TechFilterPanel";
import TechList from "../components/TechList/TechList";
import useLocalStorage from "../hooks/useLocalStorage";
import useTechnologies from "../hooks/useTechnologies";
import { Tech, TechFilters } from "../types";
import { exportTechnologies, getTechnologiesByStatus } from "../utils/tech";
import "./TechnologyListPage.css";

const TECHNOLOGIES_KEY = "technologies";

export default function TechnologyListPage() {
  const { technologies, setTechnologies, updateStatus } = useTechnologies();
  const [filters, setFilters] = useLocalStorage<TechFilters>("filters", {});

  useEffect(() => {
    localStorage.setItem(TECHNOLOGIES_KEY, JSON.stringify(technologies));
  }, [technologies]);

  const setRandomTechToInProgress = () => {
    const notStartedTechCount = getTechnologiesByStatus(
      technologies,
      "not-started",
    ).length;

    if (notStartedTechCount > 0) {
      while (true) {
        const randomI = Math.floor(Math.random() * technologies.length);

        if (technologies[randomI].status === "not-started") {
          updateStatus(technologies[randomI].id);
          break;
        }
      }
    }
  };

  return (
    <main>
      <div className="top-panel">
      <QuickActions
        setAllToCompleted={() => {
          const completedTechnologies: Tech[] = technologies.map((t) => {
            return { ...t, status: "completed" };
          });
          setTechnologies(completedTechnologies);
        }}
        resetAll={() => {
          const notStartedTechnologies: Tech[] = technologies.map((t) => {
            return { ...t, status: "not-started" };
          });
          setTechnologies(notStartedTechnologies);
        }}
        setRandomTechToInProgress={setRandomTechToInProgress}
        exportTechnologies={() => {
          exportTechnologies(technologies);
        }}
      />
      <TechFilterPanel filters={filters} setFilters={setFilters} />
      </div>
      <TechList filters={filters} />
    </main>
  );
}
