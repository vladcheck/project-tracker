import { TechFilters } from "../../types";

export interface FiltersProps {
  filters: TechFilters;
  setFilters: (status: TechFilters) => void;
}
