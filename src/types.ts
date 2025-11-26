export type Status = "completed" | "in-progress" | "cancelled" | "not-started";
export type Difficulty =
  | "none"
  | "trivial"
  | "easy"
  | "medium"
  | "hard"
  | "insane";

export interface Tech {
  id: string;
  name: string;
  description: string;
  status: Status;
  notes?: string;
  resources: string[];
  dependsOn?: Tech[];
  startDate?: Date;
  deadline?: Date;
  category: string;
  difficulty: Difficulty;
}

export type TechFilters = Partial<Tech>; 
