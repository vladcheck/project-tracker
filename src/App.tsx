import { useEffect } from "react";
import "./App.css";
import { exportTechnologies, getTechnologiesByStatus } from "./utils/tech";
import Statistics from "./components/Statistics/Statistics";
import QuickActions from "./components/QuickActions/QuickActions";
import { Tech, TechFilters } from "./types";
import TechList from "./components/TechList/TechList";
import TechFilterPanel from "./components/TechFilterPanel/TechFilterPanel";
import useLocalStorage from "./hooks/useLocalStorage";
import useTechnologies from "./hooks/useTechnologies";

export const TECHNOLOGIES_KEY = "technologies";

export default function App() {
  const { technologies, setTechnologies, updateStatus, progress } =
    useTechnologies();

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
    <div id="root">
      <aside>
        <header>
          <h1>
            Roadmapper<sup style={{ fontSize: "8px" }}>TM</sup>
          </h1>
          <div>
            <button></button>
          </div>
        </header>
        <Statistics
          stats={{
            progress,
            totalCount: technologies.length,
            completedCount: getTechnologiesByStatus(technologies, "completed")
              .length,
            cancelled: getTechnologiesByStatus(technologies, "cancelled")
              .length,
            inProgress: getTechnologiesByStatus(technologies, "in-progress")
              .length,
            completed: getTechnologiesByStatus(technologies, "completed")
              .length,
            notStarted: getTechnologiesByStatus(technologies, "not-started")
              .length,
          }}
        />
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
      </aside>
      <main>
        <TechList
          technologies={technologies}
          setTechnologies={setTechnologies}
          filters={filters}
        />
      </main>
    </div>
  );
}
