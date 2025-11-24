import { Tech } from "../types";
import { v4 as uuidv4 } from "uuid";

// Generate IDs once - do not regenerate on HMR
const IDS = {
  REACT_COMPONENTS: uuidv4(),
  JSX_SYNTAX: uuidv4(),
  STATE_MANAGEMENT: uuidv4(),
  PROPS: uuidv4(),
  USE_REF: uuidv4(),
  USE_MEMO: uuidv4(),
  USE_CONTEXT: uuidv4(),
};

export const techMock: Tech[] = [
  {
    id: IDS.REACT_COMPONENTS,
    title: "React Components",
    description: "Изучение базовых компонентов",
    status: "completed",
    dueDate: "2025",
  },
  {
    id: IDS.JSX_SYNTAX,
    title: "JSX Syntax",
    description: "Освоение синтаксиса JSX",
    status: "completed",
    dueDate: "2025",
  },
  {
    id: IDS.STATE_MANAGEMENT,
    title: "State Management",
    description: "Работа с состоянием компонентов",
    status: "completed",
    dueDate: "2025",
  },
  {
    id: IDS.PROPS,
    title: "Props",
    description: "Передача пропсов компонентам",
    status: "completed",
    dueDate: "2025",
  },
  {
    id: IDS.USE_REF,
    title: "useRef()",
    description: "Для чего нужен useRef и как им пользоваться",
    status: "not-started",
    dueDate: "2025",
  },
  {
    id: IDS.USE_MEMO,
    title: "useMemo()",
    description: "Для чего нужен useMemo и как им пользоваться",
    status: "not-started",
    dueDate: "2025",
  },
  {
    id: IDS.USE_CONTEXT,
    title: "useContext()",
    description:
      "Для чего нужен useContext и как им пользоваться, чем он отличается от useState()",
    status: "completed",
  },
];
