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
  title: string;
  description: string;
  status: Status;
  notes?: string;
  resources: string[];
  dependsOn?: Tech[];
  deadline?: Date;
  category: string;
  difficulty: Difficulty;
}

export type TechFilters = Partial<Tech>; 
