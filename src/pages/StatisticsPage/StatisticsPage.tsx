import Statistics from "../../components/Statistics/Statistics";
import useTechnologies from "../../hooks/useTechnologies";
import { getTechnologiesByStatus } from "../../utils/tech";

export default function StatisticsPage() {
  const { technologies, progress } = useTechnologies();

  return (
    <main>
      <Statistics
        stats={{
          progress,
          totalCount: technologies.length,
          completedCount: getTechnologiesByStatus(technologies, "completed")
            .length,
          cancelled: getTechnologiesByStatus(technologies, "cancelled").length,
          inProgress: getTechnologiesByStatus(technologies, "in-progress")
            .length,
          completed: getTechnologiesByStatus(technologies, "completed").length,
          notStarted: getTechnologiesByStatus(technologies, "not-started")
            .length,
        }}
      />
    </main>
  );
}
