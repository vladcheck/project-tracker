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
    <div className="notes-section">
      <h4>Заметки</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Ваши заметки"
        cols={72}
        rows={4}
      />
    </div>
  );
}
