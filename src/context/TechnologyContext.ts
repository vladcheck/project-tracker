import { createContext, Dispatch, SetStateAction } from "react";
import { Tech } from "../types";

interface ITechnologyContext {
  technologies: Tech[];
  setTechnologies:
    | Dispatch<SetStateAction<Tech[]>>
    | ((technologies: Tech[]) => void);
}
export const TechnologyContext = createContext<ITechnologyContext>(
  {} as ITechnologyContext,
);
