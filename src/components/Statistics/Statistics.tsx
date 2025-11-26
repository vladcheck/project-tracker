import { Box, InputLabel, Paper, Typography } from "@mui/material";
import ProgressBar from "../ProgressBar/ProgressBar";
import Row from "../Row/Row";

export default function Statistics({
  stats,
}: {
  stats: {
    progress: number;
    completedCount: number;
    totalCount: number;
    cancelled: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}) {
  return (
    <Paper className="statistics" sx={{ padding: "20px", minWidth: "600px" }}>
      <Typography variant="h1" component="h2" gutterBottom>
        Статистика
      </Typography>
      <Row>
        <InputLabel htmlFor="total-tech-count">Всего технологий:</InputLabel>
        <span id="total-tech-count" className="total-tech-count">
          {stats.totalCount}
        </span>
      </Row>
      <Box className="progress-container row">
        <InputLabel className="percentage-label" htmlFor="learning-progress">
          Изучено: {stats.progress}%
        </InputLabel>
        <ProgressBar
          id="learning-progress"
          aria-busy="false"
          role="progressbar"
          progress={stats.progress}
        ></ProgressBar>
      </Box>
      <Row>
        <InputLabel htmlFor="not-started-tasks">Не начато:</InputLabel>
        <span id="not-started-tasks">{stats.notStarted}</span>
      </Row>
      <Row>
        <InputLabel htmlFor="in-progress-tasks">Изучается:</InputLabel>
        <span id="in-progress-tasks">{stats.inProgress}</span>
      </Row>
      <Row>
        <InputLabel htmlFor="completed-tasks">Изучено:</InputLabel>
        <span id="completed-tasks">{stats.completed}</span>
      </Row>
      <Row>
        <InputLabel htmlFor="cancelled-tasks">Не будет изучено:</InputLabel>
        <span id="cancelled-tasks">{stats.cancelled}</span>
      </Row>
    </Paper>
  );
}
