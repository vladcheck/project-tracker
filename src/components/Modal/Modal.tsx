import "Modal.css";
import { PropsWithChildren } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: PropsWithChildren & {
  isOpen: boolean;
  onClose: (...arg0: unknown[]) => void;
  title: string;
}) {
  // Если модалка закрыта - не показываем ничего
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-background"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-window">
        {/* Шапка модалки с заголовком и кнопкой закрытия */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Основное содержимое модалки */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
