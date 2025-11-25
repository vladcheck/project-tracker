import { Tech } from "../types";
import { v4 as uuidv4 } from "uuid";

export const techMock: Tech[] = [
  {
    id: uuidv4(),
    name: "React Components",
    description: "Изучение базовых компонентов",
    status: "completed",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "completed",
    difficulty: "trivial",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "State Management",
    description: "Работа с состоянием компонентов",
    status: "completed",
    difficulty: "medium",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "Props",
    description: "Передача пропсов компонентам",
    status: "completed",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "useRef()",
    description: "Для чего нужен useRef и как им пользоваться",
    status: "not-started",
    difficulty: "easy",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "useMemo()",
    description: "Для чего нужен useMemo и как им пользоваться",
    status: "not-started",
    difficulty: "medium",
    category: "frontend",
    resources: [],
  },
  {
    id: uuidv4(),
    name: "useContext()",
    description:
      "Для чего нужен useContext и как им пользоваться, чем он отличается от useState()",
    status: "completed",
    difficulty: "hard",
    category: "frontend",
    resources: [],
  },
];
