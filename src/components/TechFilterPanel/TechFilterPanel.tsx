import { FiltersProps } from "./types";
import Row from "../Row/Row";
import "./style.css";
import { Box, Button, InputLabel, Typography } from "@mui/material";

export default function TechFilterPanel({ filters, setFilters }: FiltersProps) {
  return (
    <Box id="tech-filter-panel">
      <Typography variant="h2" component="h2" gutterBottom>
        Фильтры
      </Typography>
      <Box className="status-filters">
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, status: undefined })}
        >
          Все
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, status: "not-started" })}
        >
          Не начатые
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, status: "in-progress" })}
        >
          В процессе изучения
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, status: "completed" })}
        >
          Изученные
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilters({ ...filters, status: "cancelled" })}
        >
          Отмененные
        </Button>
      </Box>
      <Box className="filter-inputs">
        <Row>
          <InputLabel htmlFor="tech-name">Название</InputLabel>
          <input
            type="text"
            id="tech-name"
            value={filters.name ?? ""}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            placeholder="(нет)"
          />
        </Row>
        <Row>
          <InputLabel htmlFor="tech-description">Описание</InputLabel>
          <input
            type="text"
            id="tech-description"
            value={filters.description ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, description: e.target.value })
            }
            placeholder="(нет)"
          />
        </Row>
      </Box>
    </Box>
  );
}
