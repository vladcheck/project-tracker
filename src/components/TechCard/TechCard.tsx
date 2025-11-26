import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import useTechnologies from "../../hooks/useTechnologies";
import { Tech } from "../../types";
import translate from "../../utils/i18n";
import TechNotes from "../TechNotes/TechNotes";
import "./style.css";
import { DeleteOutline } from "@mui/icons-material";

export default function TechCard({
  data,
  onNotesChange,
  setStatus,
}: {
  data: Tech;
  onNotesChange: (...args: any[]) => void;
  setStatus: (id: string) => void;
}) {
  const { removeTechnology } = useTechnologies();

  return (
    <Card
      aria-label="Технология"
      className={`tech-card ${data.status}`}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <CardActions className="tech-card-actions">
        <IconButton
          onClick={() => {
            removeTechnology(data.id);
          }}
          role="button"
          aria-label="Удалить технологию"
          className="delete-tech-button action"
          name="Удалить технологию"
        >
          <DeleteOutline />
        </IconButton>
      </CardActions>
      <CardContent className="tech-info">
        <Typography className="name" variant="h3" component="h3" gutterBottom>
          {data.name}
        </Typography>
        <Typography className="description" variant="body1" component="p">
          {data.description}
        </Typography>
        <Box className="meta-info">
          <Box className="status">
            <InputLabel>Статус:</InputLabel> {translate(data.status)}
          </Box>
          {data.deadline && (
            <Box className="deadline">
              <InputLabel>Дедлайн:</InputLabel> {data.deadline.toString()}
            </Box>
          )}
          <Box className="difficulty">
            <InputLabel>Сложность:</InputLabel> {translate(data.difficulty)}
          </Box>
          <Box className="category">
            <InputLabel>Категория:</InputLabel> {translate(data.category)}
          </Box>
          <Box className="resources">
            <InputLabel>Ресурсы:</InputLabel>
            {data.resources.length > 0 ? (
              data.resources.map((resource) => (
                <Link href={resource} target="__blank">
                  {resource}
                </Link>
              ))
            ) : (
              <span>нет</span>
            )}
          </Box>
        </Box>
        <TechNotes
          techId={data.id}
          onNotesChange={onNotesChange}
          notes={data.notes}
        />
        <Button
          variant="outlined"
          className="switch-status button"
          onClick={() => {
            setStatus(data.id);
          }}
        >
          Переключить статус
        </Button>
      </CardContent>
    </Card>
  );
}
