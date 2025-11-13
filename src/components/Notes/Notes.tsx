export default function Notes({
  noteText,
  onNotesChange,
  techId,
}: {
  noteText: string;
  onNotesChange: (techId: string, newValue: string) => void;
  techId: string;
}) {
  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={noteText}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows={3}
      />
      <div className="notes-hint">
        {noteText.length > 0
          ? `Заметка сохранена (${noteText.length} символов)`
          : "Добавьте заметку"}
      </div>
    </div>
  );
}
