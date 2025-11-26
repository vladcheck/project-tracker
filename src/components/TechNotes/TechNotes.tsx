import { Box, TextareaAutosize, Typography } from "@mui/material";

export default function TechNotes({
  notes = "",
  onNotesChange,
  techId,
}: {
  notes?: string;
  onNotesChange: (techId: string, notes: string) => void;
  techId: string;
}) {
  return (
    <Box className="notes-section">
      <Typography variant="h4" component="h4" gutterBottom>
        Заметки
      </Typography>
      <TextareaAutosize
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Ваши заметки"
        cols={72}
      />
    </Box>
  );
}
