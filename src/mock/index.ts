import { Tech } from "../types";
import { v4 as uuidv4 } from "uuid";

export const techMock: Tech[] = [
  {
    id: uuidv4(),
    title: "React Components",
    description: "Изучение базовых компонентов",
    status: "completed",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "completed",
    difficulty: "trivial",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "State Management",
    description: "Работа с состоянием компонентов",
    status: "completed",
    difficulty: "medium",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "Props",
    description: "Передача пропсов компонентам",
    status: "completed",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "useRef()",
    description: "Для чего нужен useRef и как им пользоваться",
    status: "not-started",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "useMemo()",
    description: "Для чего нужен useMemo и как им пользоваться",
    status: "not-started",
    difficulty: "medium",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    title: "useContext()",
    description:
      "Для чего нужен useContext и как им пользоваться, чем он отличается от useState()",
    status: "completed",
    difficulty: "hard",
    category: "frontend",
    resources: [],
  },
];
