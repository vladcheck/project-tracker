import { useContext } from "react";
import { getNextStatus } from "../utils/status";
import { TechnologyContext } from "../context/TechnologyContext";
import { Tech } from "../types";

export default function useTechnologies() {
  const { technologies, setTechnologies } = useContext(TechnologyContext);

  const addTechnology = (t: Tech | Tech[]) => {
    if (Array.isArray(t)) {
      setTechnologies([...technologies, ...t]);
    } else {
      setTechnologies([...technologies, t]);
    }
  };

  const removeTechnology = (techId: string) => {
    setTechnologies([...technologies.filter((t) => t.id !== techId)]);
  };

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
    removeTechnology,
    addTechnology,
    setTechnologies,
    updateStatus,
    progress: calculateProgress(),
  };
}
