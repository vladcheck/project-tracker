export type Status = "completed" | "in-progress" | "cancelled" | "not-started";

export interface Tech {
  id: string;
  title: string;
  description: string;
  status: Status;
  notes?: string;
}

export interface TechFilters {
  id?: string;
  title?: string;
  description?: string;
  status?: Status;
  notes?: string;
}
