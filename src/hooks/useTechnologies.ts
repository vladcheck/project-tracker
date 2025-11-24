import { techMock } from "../mock";
import { getNextStatus } from "../utils/status";
import useLocalStorage from "./useLocalStorage";

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    techMock,
  );

  // Функция для обновления статуса технологии
  const updateStatus = (techId: string) => {
    setTechnologies(
      technologies.map((t) =>
        t.id === techId ? { ...t, status: getNextStatus(t.status) } : t,
      ),
    );
  };

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(
      (tech) => tech.status === "completed",
    ).length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    progress: calculateProgress(),
  };
}
