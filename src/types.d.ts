export type Status = "completed" | "in-progress" | "cancelled" | "not-started";

export interface Tech {
  id: string;
  title: string;
  description: string;
  status: Status;
  notes?: string;
  dependsOn?: Tech[];
  dueDate?: string;
}

export type TechFilters = Partial<Tech>; 
