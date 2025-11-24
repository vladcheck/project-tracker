import { useEffect } from "react";
import "./App.css";
import { getTechnologiesByStatus } from "./utils/tech";
import Statistics from "./components/Statistics/Statistics";
import QuickActions from "./components/QuickActions/QuickActions";
import { Tech, TechFilters } from "./types";
import TechList from "./components/TechList/TechList";
import TechFilterPanel from "./components/TechFilterPanel/TechFilterPanel";
import useLocalStorage from "./hooks/useLocalStorage";
import { techMock } from "./mock";

const TECHNOLOGIES_KEY = "technologies";

function exportTechnologies(technologies: Tech[]) {
  const blob = new Blob([JSON.stringify(technologies, null, 2)], {
    type: "json",
  });
  const urlForDownload = window.URL.createObjectURL(blob);
  const linkElement = document.createElement("a");

  linkElement.href = urlForDownload;
  linkElement.download = "technologies.json";
  linkElement.click();

  URL.revokeObjectURL(urlForDownload);
}

export default function App() {
  const [technologies, setTechnologies] = useLocalStorage<Tech[]>(
    "technologies",
    techMock,
  );

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

        if (technologies[randomI].status !== "not-started") continue;

        setTechnologies(
          technologies.map((t, i) => {
            if (i === randomI) {
              t.status = "in-progress";
            }
            return t;
          }),
        );
        break;
      }
    }
  };

  return (
    <div id="root">
      <aside>
        <h1>
          Roadmapper<sup style={{ fontSize: "8px" }}>TM</sup>
        </h1>
        <Statistics
          stats={{
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
