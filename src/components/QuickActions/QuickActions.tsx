import { Box, Typography, Button } from "@mui/material";
import "./style.css";
import {
  Casino,
  ClearAll,
  DoneAll,
  FileDownload,
  FileUpload,
} from "@mui/icons-material";

interface QuickActionsProps {
  setAllToCompleted: () => void;
  resetAll: () => void;
  setRandomTechToInProgress: () => void;
  exportTechnologies: () => void;
  importTechnologies: (e: any) => void;
}

export default function QuickActions({
  setAllToCompleted,
  resetAll,
  setRandomTechToInProgress,
  exportTechnologies,
  importTechnologies,
}: QuickActionsProps) {
  return (
    <Box className="quick-actions-section">
      <Typography variant="h2" component="h2" gutterBottom>
        Быстрые действия
      </Typography>
      <Box className="quick-actions">
        <Button
          name="Отметить все как выполненные"
          variant="outlined"
          onClick={setAllToCompleted}
        >
          <DoneAll />
        </Button>
        <Button
          onClick={resetAll}
          variant="outlined"
          name="Сбросить все статусы"
        >
          <ClearAll />
        </Button>
        <Button
          variant="outlined"
          onClick={setRandomTechToInProgress}
          name="Случайный выбор следующей технологии"
        >
          <Casino />
        </Button>
        <Button
          onClick={exportTechnologies}
          variant="outlined"
          name="Экспортировать в JSON"
        >
          <FileDownload />
        </Button>
        <Button
          onClick={(e) => {
            importTechnologies(e);
          }}
          variant="outlined"
          name="Импортировать технологии"
        >
          <FileUpload />
        </Button>
      </Box>
    </Box>
  );
}
