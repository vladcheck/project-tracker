import { useEffect } from "react";
import ProgressHeader from "./components/ProgressHeader/ProgressHeader";
import "./App.css";
import { getTechnologiesByValue } from "./utils/tech";
import Statistics from "./components/Statistics/Statistics";
import QuickActions from "./components/QuickActions/QuickActions";
import { Status, Tech, TechFilters } from "./types";
import TechList from "./components/TechList/TechList";
import TechFilterPanel from "./components/TechFilterPanel/TechFilterPanel";
import useLocalStorage from "./hooks/useLocalStorage";
import { techMock } from "./mock";

const TECHNOLOGIES_KEY = "technologies";

export default function App() {
  const [technologies, setTechnologies] = useLocalStorage<Tech[]>(
    "technologies",
    techMock
  );

  const [filters, setFilters] = useLocalStorage<TechFilters>("filters", {});

  useEffect(() => {
    localStorage.setItem(TECHNOLOGIES_KEY, JSON.stringify(technologies));
  }, [technologies]);

  const setRandomTechToInProgress = () => {
    const notStartedTechCount = getTechnologiesByValue(
      technologies,
      "status",
      "not-started"
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
          })
        );
        break;
      }
    }
  };

  return (
    <div id="root">
      <header>
        <h1>Список технологий</h1>
        <ProgressHeader
          totalCount={technologies.length}
          completedCount={
            getTechnologiesByValue(technologies, "status", "completed").length
          }
        />
        <Statistics
          stats={{
            cancelled: getTechnologiesByValue<Status>(
              technologies,
              "status",
              "cancelled"
            ).length,
            inProgress: getTechnologiesByValue<Status>(
              technologies,
              "status",
              "in-progress"
            ).length,
            completed: getTechnologiesByValue<Status>(
              technologies,
              "status",
              "completed"
            ).length,
            notStarted: getTechnologiesByValue<Status>(
              technologies,
              "status",
              "not-started"
            ).length,
          }}
        />
      </header>
      <main>
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
            const blob = new Blob([JSON.stringify(technologies, null, 2)], {
              type: "json",
            });
            const urlForDownload = window.URL.createObjectURL(blob);
            const linkElement = document.createElement("a");

            linkElement.href = urlForDownload;
            linkElement.download = "technologies.json";
            linkElement.click();

            URL.revokeObjectURL(urlForDownload); // Free memory
          }}
        />
        <TechFilterPanel filters={filters} setFilters={setFilters} />

        <TechList
          technologies={technologies}
          setTechnologies={setTechnologies}
          filters={filters}
        />
      </main>
    </div>
  );
}
